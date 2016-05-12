var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sftp = require('gulp-sftp'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    less = require('gulp-less'),
    path = require('path'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css');

// vendor prefix
gulp.task('autoprefixer', function() {
  return gulp.src('bourbon/style.css')
  .pipe(prefix(["ie 8", "ie 7"]))
  .pipe(gulp.dest('build/css/'));
});

// Bower
gulp.task('bower', function () {
  gulp.src('./build/index.html')
    .pipe(wiredep({
      directory : "build/libs"
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('less-watch', ['less'], browserSync.reload);

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
    return gulp.src("dist/less/main.less")
    .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(clean())
        .pipe(autoprefixer())
        .pipe(minifyCss({
            keepBreaks: false
        }))
        .pipe(gulp.dest("build/css"))
});


// Static Server + watching less/html files
gulp.task('server', ['less'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("dist/less/*.less", ['less-watch']);
});

// Clean
gulp.task('clean', function() {
	return gulp.src('dist', {read: false})
	.pipe(clean());
})

gulp.task("default", ['server']);