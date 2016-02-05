var gulp = require('gulp');
var rename = require('gulp-rename');
var dot = require('gulp-seajs-dot');
var css = require('gulp-seajs-css');
var del = require('del');

var DIST = './dist/';
var DIST_APP = DIST + 'app/';
var SRC = 'src/';
var APP = SRC + 'app/';

gulp.task('clean', function () {
    del.sync(DIST);
    gulp.src(['./src/index.html', './src/lib/**/*', './src/mock/**/*', './src/vendor/**/*'], {base: './src/'})
        .pipe(gulp.dest(DIST));
});

gulp.task('copy', handleCopy);
function handleCopy(path) {
    path = typeof path === 'string' ? path : APP + '**/*.js';
    gulp.src(path, {base: APP})
        .pipe(gulp.dest(DIST_APP));
}

function handleDelete(path){
    if(typeof path === 'string'){
        path = path.substr(path.lastIndexOf(SRC.replace('/', '\\'))).replace(SRC.replace('/', ''), DIST);
        var pathArr = path.split('\\');
        var arr = pathArr[pathArr.length - 1].split('.');
        if(path.indexOf('.html') != -1) {
            pathArr[pathArr.length - 1] = 'tpl_' + arr[0] + '.js';
        } else if (path.indexOf('.css') != -1) {
            pathArr[pathArr.length - 1] = 'css_' + arr[0] + '.js';
        }
        path = pathArr.join('\\');
    } else {
        path = DIST_APP + '**/*.js';
    }
    del.sync(path);
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
    gulp.watch([SRC + '**/*.js', SRC + '**/*.json'], function (vinyl) {
        console.log('watch copy', vinyl);
        switch ( vinyl.type ){
            case 'added' :
            case 'changed' : handleCopy(vinyl.path); break;
            case 'deleted' : handleDelete(vinyl.path); break;
        }
    });
    gulp.watch(APP + '**/*.html', function (vinyl) {
        console.log('watch Dot', vinyl);
        switch ( vinyl.type ){
            case 'added' :
            case 'changed' : handleDoT(vinyl); break;
            case 'deleted' : handleDelete(vinyl.path); break;
        }
    });
    gulp.watch(APP + '**/*.css', function (vinyl) {
        console.log('watch Css', vinyl);
        switch ( vinyl.type ) {
            case 'added' :
            case 'changed' : handleCss(vinyl); break;
            case 'deleted' : handleDelete(vinyl.path); break;
        }
    });
});

gulp.task('default', ['clean', 'copy', 'dot', 'css']);