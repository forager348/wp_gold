/**
 * Gulp task file
 * 
 * Author: forager348
 */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  gulpIf = require('gulp-if'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  del = require('del');

/**
 * Transpile SASS to CSS
 */
gulp.task('sass', (done) => {
  gulp.src('src/sass/*')
    .pipe(sass())
    .pipe(gulp.dest('src/css'));
  done();
});

/**
 * Minify JS/CSS, copy HTML and move to deployables directory
 */
gulp.task('useref', (done) => {
  gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('public_html'));
  done();
});

/**
 * Optimize images and move to deployables directory
 */
gulp.task('images', (done) => {
  gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('public_html/images'));
  done();
});

/**
 * Copy fonts to deployables directory
 */
gulp.task('fonts', (done) => {
  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('public_html/fonts'));
  done();
});

/**
 * Clean deployables directory
 */
gulp.task('clean', (done) => {
  del.sync('public_html');
  done();
});

/**
 * Build deployables
 */
gulp.task('build', gulp.series('clean', 'sass', 'images', 'fonts', 'useref'));