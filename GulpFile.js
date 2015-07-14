var gulp = require('gulp'),
    requireDir = require('require-dir'),
    tasks = requireDir('./gulp'),
    runSequence = require('run-sequence');


gulp.task('default', function (cb) {
    runSequence('less','watch', cb);
});

