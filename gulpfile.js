const { series, src, dest, parallel } = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');
const tsReporter = typescript.reporter.fullReporter();
const browsersync = require('browser-sync').create();

const config = {
    "sourceRootFrontend": "src/frontend/",
    "sourceRootBackend": "src/backend/",
    "buildRoot": "dist/",
    "htmlSource": "src/frontend/*.html",
}

function copyHtml() {
    return src(config.htmlSource, { debug: true })
        .pipe(dest(config.buildRoot, { debug: true }));
}

function copyCSS() {
    return src(config.sourceRootFrontend + "**/*.css")
        .pipe(dest(config.buildRoot ));
}

function copyJS() {
    return src(config.sourceRootFrontend + "**/*.js")
        .pipe(dest(config.buildRoot ));
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

function watch() {
    // Watch for changes in frontend
    watch(config.sourceRootFrontend + "**/*.ts", compileTSFrontend);
    watch(config.sourceRootFrontend + "**/*.html", copyHtml);
    watch(config.sourceRootFrontend + "assets/**/*", copyAssets);
    // Watch for changes in backend
    watch(config.sourceRootBackend + "**/*.ts", compileTSBackend);
    // Watch for changes in dist
    watch(config.buildRoot + "**/*", browsersyncReload);
}

function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: 'dist'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

const watchAndServe = series(parallel(copyHtml, copyAssets), series(compileTSFrontend, compileTSBackend), browsersyncServe);

exports.browsersyncServe = browsersyncServe;
exports.watch = watch;
exports.watchAndServe = watchAndServe;
<<<<<<< HEAD
const frontend = series(copyHtml, copyAssets,copyCSS,copyJS, compileTSFrontend);
=======

const frontend = series(copyHtml, copyAssets, compileTSFrontend);
>>>>>>> leon-ingame-page
const backend = series(compileTSBackend);
exports.default = series(frontend, backend);