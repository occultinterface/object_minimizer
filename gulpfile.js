var gulp = require('gulp');
var watch = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();;

//Adding paths as variables so they can be easily changed if need be. 
var paths = {
    scss: 'app/'
};

//Creating a task for sass compilation.
gulp.task('sass', function () {
    return gulp.src([
            paths.scss + '*.scss'
        ])
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9"))
        .pipe(gulp.dest("public"))
        .pipe(browserSync.stream());
});


gulp.task('start', function () {
    gulp.watch(paths.scss + '*.scss', gulp.series('sass')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'start'));