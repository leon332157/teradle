const { series,src,dest,parallel } = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');
const tsReporter = typescript.reporter.fullReporter();

const config = {
    "sourceRootFrontend": "src/frontend/",
    "sourceRootBackend": "src/backend/",
    "buildRoot": "dist/",
    "htmlSource": "src/frontend/*.html",
}

function copyHtml () {
    return src(config.htmlSource,{debug: true})
        .pipe(dest(config.buildRoot,{debug: true}));
    }

function copyAssets () {
    return src(config.sourceRootFrontend + "assets/**/*")
        .pipe(dest(config.buildRoot+"assets/"));
    }

function compileTSFrontend () {
    let tsResult = src(config.sourceRootFrontend+"**/*.ts")
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

const frontend = series(copyHtml,copyAssets,compileTSFrontend);
const backend = series(compileTSBackend);
exports.default = series(frontend, backend);