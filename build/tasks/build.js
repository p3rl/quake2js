var gulp = require("gulp");
var babel = require("gulp-babel");
var runSequence = require('run-sequence');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

gulp.task("build-system", function () {
  return gulp.src(paths.src)
    .pipe(babel(assign({}, compilerOptions, { modules: 'system' })))
    .pipe(gulp.dest(paths.output));
});

gulp.task("build-common", function () {
  return gulp.src(paths.src)
    .pipe(babel(assign({}, compilerOptions, { modules: 'common' })))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(cb) {
  return runSequence('clean', ['build-system'], cb);
});

gulp.task('default', ['build'], function() {});
