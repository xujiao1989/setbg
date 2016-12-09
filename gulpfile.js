'use strict';
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const plugins = require('gulp-load-plugins')();
const imagemin = require('gulp-imagemin');
const buildTmpl = require('./tasks/buildTmpl');


var _ = require('lodash');
var merge = require('merge-stream');
var amdOpt = require('amd-optimize');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

const config = {
    'dist': path.join(__dirname, 'dist'),
    'src': path.join(__dirname, 'src'),
    'task': path.join(__dirname, 'task'),
    'dev':path.join(__dirname,'dev')
};

gulp.task('tmpl2js', function () {
  var text = 'var templates = {};\r\n';
  gulp.src(path.join(config.src, 'tmpl/','/**/*.html'))
    .pipe(plugins.tmpl2js({
      mode: 'compress',
      ignoreScriptTag: true
    }))
    .pipe(buildTmpl({
      'base': path.join( 'tmpl')
    }))
    .pipe(plugins.concat("setbgdom.js"))
    .pipe(plugins.insert.prepend(text))
    .pipe(plugins.wrapAmd({
      'exports': 'templates'
    }))
    .pipe(plugins.esformatter({
      indent: {
        value: '    '
      }
    }))
      .pipe(uglify())
      .pipe(gulp.dest(path.join(config.src+"/js/mod")))
});
function compileScript(){
    var jsPkgMerge = merge();
    var files = fs.readdirSync(config.src+"/js/pkg");
    _.forEach(files, function (value) {
        var mod = _.replace(value, '.js', '');
        var stream = gulp.src(config.src+"/js/pkg/*.js")
            .pipe(plumber())
            .pipe(amdOpt(mod))
            .pipe(concat(value))
            .pipe(gulp.dest(config.dev+"/js"));
        jsPkgMerge.add(stream);
    });
    return jsPkgMerge;
}
gulp.task('compileJs',function(){
    compileScript();
});
gulp.task('copyImg', function() {
    return gulp.src(config.src+"/img/*.png")
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(config.dev+"/img"));
});
gulp.task('copyHtml',function(){
    return gulp.src(config.src+"/*.html")
        .pipe(gulp.dest(config.dev));
});

gulp.task('start',['copyHtml','copyImg','tmpl2js','compileJs'],function () {
    gulp.watch('src/tmpl/**/*.html', ['tmpl2js','compileJs']);
    gulp.watch('src/js/**/*.js', ['compileJs']);
});
