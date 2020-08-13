const { src, dest, series, parallel, watch } = require('gulp');
const sass = require("gulp-sass");
const browserSync = require('browser-sync');

var bs = require("browser-sync").create();

sass.compiler = require("node-sass");

const config = {
    src: {
        scss: "./src/scss/**/*.scss",
        template: "./src/html/**/*.html"
    },
    dest: {
        css: "./dist/css",
        html: "./dist/"
    }
};

function css(cb) {
    src(config.src.scss)
        .pipe(sass().on("error", sass.logError))
        .pipe(dest(config.dest.css))
        .pipe(bs.stream());

    cb();
}

function html(cb) {
    src(config.src.template)
        .pipe(dest(config.dest.html))
        .pipe(bs.stream());

    cb();
}

function server(cb) {
    bs.init({
        server: "./dist"
    });

    cb();
}

function develop() {
    watch(config.src.scss, css);
    watch(config.src.template, html);
}

exports.css = css;
exports.develop = series(server, css, html, develop);