
// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass');

var ignorePaths = ['materialize'];
var sourcePaths = {
  js: 'source/js/!('+ignorePaths.join('|')+')/*.js',
  scss: 'source/scss/**/*.scss'
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
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch(sourcePaths.js, ['jshint']);
  gulp.watch(sourcePaths.scss, ['build-css']);
});
