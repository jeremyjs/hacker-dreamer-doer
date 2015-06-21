
// grab our packages
var gulp       = require('gulp'),
    jshint     = require('gulp-jshint'),
    concat     = require('gulp-concat'),
    gutil      = require('gulp-util'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

var ignorePaths = ['materialize'];
var sourcePaths = {
  js: 'source/js/**/*.js',
  scss: 'source/scss/**/main.scss'
};

// watch on `gulp`
gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src(sourcePaths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
  return gulp.src(sourcePaths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/'));
});

gulp.task('build-js', function() {
  return gulp.src(sourcePaths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    // only uglify if gulp is run with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/'));
});

gulp.task('watch', function() {
  gulp.watch(sourcePaths.js, ['jshint', 'build-js']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
});
