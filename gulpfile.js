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
gulp.task('sass', () => {
  return gulp.src('src/sass/*')
    .pipe(sass())
    .pipe(gulp.dest('src/css'));
});

/**
 * Minify JS/CSS, copy HTML and move to deployables directory
 */
gulp.task('useref', () => {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('public_html'));
});

/**
 * Optimize images and move to deployables directory
 */
gulp.task('images', () => {
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('public_html/images'));
});

/**
 * Copy fonts to deployables directory
 */
gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('public_html/fonts'));
});

/**
 * Clean deployables directory
 */
gulp.task('clean', () => {
  return del.sync('public_html');
});

/**
 * Build deployables
 */
gulp.task('build', [`clean`, `sass`, `images`, `fonts`, `useref`], (async) => {
  async();
});