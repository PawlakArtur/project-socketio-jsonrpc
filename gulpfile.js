var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var uglifyjs = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var sassLint = require('gulp-sass-lint');
var nodemon = require('gulp-nodemon');

// configuration
var paths = {
    html: 'build/*.html',
    css: 'build/styles/*.css',
    sass: 'build/styles/sass/*.scss',
    scripts: 'build/scripts/*.js'
};

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('clean', function() {
    return del(['app'])
});

gulp.task('cssreset', function() {
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(rename('normalize.min.css'))
        .pipe(gulp.dest('app/styles'));
});

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concatCss('style.css'))
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.stream());
});

gulp.task('sasslint', function () {
    return gulp.src(paths.sass)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        //.pipe(uglifyjs())
        //.pipe(rename('script.js'))
        .pipe(gulp.dest('app/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('build', function(callback) {
    runSequence('clean', ['html', 'cssreset', 'sass', 'scripts', 'browser-sync', 'watch'],
        callback
    )
});

gulp.task('watch', function() {
    //gulp.watch(paths.css, ['styles']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
});