
// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint');

var ignorePaths = ['materialize'];
var sourcePaths = { js: 'source/js/!('+ignorePaths.join('|')+')/*.js' };

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(sourcePaths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(sourcePaths.js, ['jshint']);
});
