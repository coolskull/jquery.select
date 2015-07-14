var gulp = require('gulp'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    autoprefixer=require('gulp-autoprefixer');


gulp.task('less', function () {
    return gulp.src('less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
});
