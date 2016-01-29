var gulp = require('gulp');
var rename = require('gulp-rename');
var dot = require('gulp-seajs-dot');
var css = require('gulp-seajs-css');
var del = require('del');

var DIST = './dist/';
var DIST_SRC = DIST + 'src/';
var SRC = './src/';

gulp.task('clean', function () {
    del.sync(DIST);
    gulp.src(['./lib/**/*'])
        .pipe(gulp.dest(DIST + 'lib/'));
    gulp.src(['./index.html'])
        .pipe(gulp.dest(DIST));
});

gulp.task('copy', handleCopy);
function handleCopy(path) {
    path = typeof path === 'string' ? path : SRC + '**/*.js';
    gulp.src(path, {base: SRC})
        .pipe(gulp.dest(DIST_SRC));
}

// CSS压缩、包装成seajs module
gulp.task('css', handleCss);
function handleCss(path) {
    path = typeof path === 'string' ? path : SRC + '**/*.css';
    gulp.src(path, {base: SRC})
        .pipe(css({prefix: 'css_'}))
        .pipe(rename(function(path){
            path.basename = 'css_'+path.basename;
        }))
        .pipe(gulp.dest(DIST_SRC));
}

// doT模板预编译、包装成seajs module
gulp.task('dot', handleDoT);
function handleDoT(path) {
    path = typeof path === 'string' ? path : SRC + '**/*.html';
    gulp.src(path, {base: SRC})
        .pipe(dot({prefix: 'tpl_'}))
        .pipe(rename(function (path) {
            path.basename = 'tpl_' + path.basename;
        }))
        .pipe(gulp.dest(DIST_SRC));
}

gulp.task('watch', function (){
    gulp.watch(SRC + '**/*.js', function (vinyl) {
        handleCopy(vinyl.path);
    });
    gulp.watch(SRC + '**/*.html', function (vinyl) {
        handleDoT(vinyl.path);
    });
    gulp.watch(SRC + '**/*.css', function (vinyl) {
        handleCss(vinyl.path);
    });
});

gulp.task('default', ['clean', 'copy', 'dot', 'css']);