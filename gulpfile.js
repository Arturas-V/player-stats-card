'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
// const jshint = require('gulp-jshint');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./app/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./app/sass/**/*.scss', gulp.series('sass'));
});

gulp.task('js', function () {
  return gulp.src(['./app/js/App.js','./app/js/Delegate.js','./app/js/Player/PlayerCard.js','./app/js/Player/Player.js'])

     .pipe(uglify())
     .pipe(concat('app.min.js'))
     .pipe(gulp.dest('./app/js/min'));
});