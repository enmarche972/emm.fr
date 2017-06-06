const gulp = require('gulp'),
    gutil = require('gulp-util'),
    bs = require('browser-sync').create(),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

gulp.task('browser-sync-init', function () {
    bs.init({
        proxy: 'http://localhost:4000'
    });
});

gulp.task('compile__css', function () {
    return gulp.src('./scss/application.scss')
        .pipe(sass())
        .on('error', function (error) {
            bs.notify('Error on compiling SCSS', 5000);
            gutil.log('\n\n', gutil.colors.red(error.stack), '\n\n');
            this.emit('end');
        })

        .pipe(concat('site.css'))
        .pipe(gulp.dest('./css'))

        .pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(rename(function (path) {
            if (path.extname === '.map') return;

            path.basename += '.min';
        }))

        .pipe(gulp.dest('./css'));
});

gulp.task('build__css', ['compile__css'], function () {
    gulp.src('./css/**/*')
        .pipe(bs.stream({match: '**/*.css'}));
});

gulp.task('watch__css', ['build__css'], function () {
    gulp.watch('./scss/**/*.scss', ['build__css']);
});

gulp.task('build__html', function () {
    bs.reload();
});

gulp.task('watch__html', ['build__html'], function () {
    gulp.watch('./index.html', ['build__html']);
});

gulp.task('watch', ['browser-sync-init', 'watch__css', 'watch__html'], function() {});