const { series, src, dest, parallel, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');
const tsReporter = typescript.reporter.fullReporter();
const browsersync = require('browser-sync').create();
const { spawn } = require('child_process');

const config = {
    "sourceRootFrontend": "src/frontend/",
    "sourceRootBackend": "src/backend/",
    "buildRoot": "dist/",
    "htmlSource": "src/frontend/*.html",
}

let backendProcess = null;

function copyHtml() {
    return src(config.htmlSource, { debug: true })
        .pipe(dest(config.buildRoot, { debug: true }));
}

function copyCSS() {
    return src(config.sourceRootFrontend + "**/*.css")
        .pipe(dest(config.buildRoot));
}

function copyJS() {
    return src(config.sourceRootFrontend + "**/*.js")
        .pipe(dest(config.buildRoot));
}

function copyAssets() {
    return src(config.sourceRootFrontend + "assets/**/*")
        .pipe(dest(config.buildRoot + "assets/"));
}

function compileTSFrontend() {
    let tsResult = src(config.sourceRootFrontend + "**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject(tsReporter));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(dest(config.buildRoot));
}

function compileTSBackend() {
    let tsResult = src(config.sourceRootBackend + "**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(dest(config.buildRoot + "backend/"));
}

function watchAndBuild() {
    // Watch for changes in frontend
    const watchOption = { events: ["add", "change"], delay: 2000 }
    watch(config.sourceRootFrontend + "**/*.ts",watchOption, compileTSFrontend);
    watch(config.sourceRootFrontend + "**/*.html",watchOption, copyHtml);
    watch(config.sourceRootFrontend + "assets/**/*",watchOption, copyAssets);
    watch(config.sourceRootFrontend + "**/*.css",watchOption, copyCSS);
    watch(config.sourceRootFrontend + "**/*.js",watchOption, copyJS);
    // Watch for changes in backend
    watch(config.sourceRootBackend + "**/*.ts",watchOption, compileTSBackend);
}

function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: 'dist'
        }
    });
    watch(config.buildRoot + "**/*", browsersyncReload);
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function runBackend() {
    watch(config.buildRoot + "backend/**/*", restartBackend);
    restartBackend(() => { });
}

function restartBackend(cb) {
    if (backendProcess) {
        backendProcess.kill();
        backendProcess = null;
        console.log('Backend process killed');
    }
    backendProcess = spawn('node', ['dist/backend/index.js'], { stdio: 'inherit' });
    backendProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    cb();
}

const watchAndServe = parallel(parallel(copyHtml, copyAssets, copyCSS, copyJS), series(compileTSFrontend, compileTSBackend), watchAndBuild, browsersyncServe);
const watchAndRunBackend = parallel(parallel(copyHtml, copyAssets, copyCSS, copyJS), series(compileTSFrontend, compileTSBackend, runBackend), watchAndBuild);
exports.watchAndServe = watchAndServe;
exports.watchAndRunBackend = watchAndRunBackend;
const frontend = series(copyHtml, copyAssets, copyCSS, copyJS, compileTSFrontend);
const backend = series(compileTSBackend);
exports.default = parallel(frontend, backend);