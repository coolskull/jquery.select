var gulp = require('gulp'),
    connect = require("gulp-connect");


gulp.task('watch', function () {
    gulp.watch('less/**.less', ['less']);
});
