var gulp = require('gulp');
var rename = require('gulp-rename');
var dot = require('gulp-seajs-dot');
var css = require('gulp-seajs-css');
var del = require('del');

var DIST = './dist/';
var DIST_APP = DIST + 'app/';
var APP = './src/app/';

gulp.task('clean', function () {
    del.sync(DIST);
    gulp.src(['./src/index.html', './src/lib/**/*', './src/vendor/**/*'], {base: './src/'})
        .pipe(gulp.dest(DIST));
});

gulp.task('copy', handleCopy);
function handleCopy(path) {
    path = typeof path === 'string' ? path : APP + '**/*.js';
    gulp.src(path, {base: APP})
        .pipe(gulp.dest(DIST_APP));
}

// CSS压缩、包装成seajs module
gulp.task('css', handleCss);
function handleCss(path) {
    path = typeof path === 'string' ? path : APP + '**/*.css';
    gulp.src(path, {base: APP})
        .pipe(css({prefix: 'css_'}))
        .pipe(rename(function(path){
            path.basename = 'css_'+path.basename;
        }))
        .pipe(gulp.dest(DIST_APP));
}

// doT模板预编译、包装成seajs module
gulp.task('dot', handleDoT);
function handleDoT(path) {
    path = typeof path === 'string' ? path : APP + '**/*.html';
    gulp.src(path, {base: APP})
        .pipe(dot({prefix: 'tpl_'}))
        .pipe(rename(function (path) {
            path.basename = 'tpl_' + path.basename;
        }))
        .pipe(gulp.dest(DIST_APP));
}

gulp.task('watch', function (){
    gulp.watch(APP + '**/*.js', function (vinyl) {
        handleCopy(vinyl.path);
    });
    gulp.watch(APP + '**/*.html', function (vinyl) {
        handleDoT(vinyl.path);
    });
    gulp.watch(APP + '**/*.css', function (vinyl) {
        handleCss(vinyl.path);
    });
});

gulp.task('default', ['clean', 'copy', 'dot', 'css']);