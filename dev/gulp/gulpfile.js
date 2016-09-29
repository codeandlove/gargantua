// Include gulp
var gulp = require('gulp');
// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass

gulp.task('styles', function() {
    return gulp.src('../../src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(plumber())
        .pipe(gulp.dest('../../src/css'))
        .pipe(browserSync.stream());
});

gulp.task('libs', function() {
  return gulp.src([
      '../../src/js/lib/three.js',
      '../../src/js/lib/**/*.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify({
        mangle: false
    }))
    .pipe(plumber())
    .pipe(gulp.dest('../../src/js'))
    .pipe(browserSync.stream())
    .on('finish', browserSync.reload);
});

gulp.task('app', function() {
    gulp.src([
            '../../src/js/src/lib/*.js',
            '../../src/js/src/app.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(plumber())
        .pipe(gulp.dest('../../src/js'))
        .pipe(browserSync.stream())
        .on('finish', browserSync.reload);
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        server: {
            baseDir: '../../src'
        }
    });
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('../../src/scss/**/*.scss', ['styles']);
    gulp.watch(['../../src/js/lib/**/*.js'], ['libs']).on('finish', browserSync.reload);
    gulp.watch(['../../src/js/src/**/*.js'], ['app']).on('finish', browserSync.reload);
});

gulp.task('default', [ 'styles', 'libs', 'app', 'browser-sync', 'watch']);
