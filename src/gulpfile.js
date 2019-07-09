var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var shell = require('gulp-shell');
var runseq = require('run-sequence');
var htmlmin = require('gulp-htmlmin');

gulp.task('scss', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefix({
            browsers: ['last 20 versions']
        }))
        .pipe(gulp.dest('static/css'));
})

gulp.task('js', function() {
    gulp.src('src/js/**/*')
        .pipe(gulp.dest('static/js'));
})

gulp.task('watch', ['scss', 'js'], function() {
    gulp.watch('src/scss/**/*', ['scss']);
    gulp.watch('src/js/**/*', ['js']);
})

gulp.task('hugo-build', ['scss', 'js'], shell.task(['hugo']));

gulp.task('minify-html', function() {
    gulp.src('public/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            useShortDoctype: true
        }))
        .pipe(gulp.dest('./public'));
})

gulp.task('dist', ['hugo-build'], (callback) => {
    runseq('minify-html', callback);
})

gulp.task('default', ['watch']);