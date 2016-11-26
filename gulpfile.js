'use strict';
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const gutil = require('gulp-util');
const plugins = require('gulp-load-plugins')();
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
  'task': path.join(__dirname, 'task')
};

gulp.task('sass', function () {
  gulp.src(path.join(config.src,'sass','*.scss'))
    .pipe(plugins.sass.sync().on('error', function (err) {
      console.log(err)
    }))
    .pipe(plugins.autoprefixer([
     'Chrome >= 20',
     'Firefox >= 24',
     'Explorer >= 6',
     'Opera >= 12',
     'Safari >= 6',
      'iOS >= 6',
      'Android 2.3',
      'Android >= 4'
     ]))
    .pipe(plugins.importCss())
    .pipe(plugins.csscomb())
    .pipe(gulp.dest(path.join(config.src,'styles')))
});

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
    .pipe(gulp.dest(path.join("D:/setbg/src/js/mod")))
});

function compileScript(){
    var jsPkgMerge = merge();
    var files = fs.readdirSync("./src/js/pkg");
    _.forEach(files, function (value) {
        var mod = _.replace(value, '.js', '');
        var stream = gulp.src("./src/js/pkg/*.js")
            .pipe(plumber())
            .pipe(amdOpt(mod))
            .pipe(concat(value))
            .pipe(gulp.dest("./dev/js"));
        jsPkgMerge.add(stream);
    });
    return jsPkgMerge;
}
gulp.task('compileJs',function(){
    compileScript();
});
gulp.task('start',['sass','tmpl2js','compileJs'],function () {
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/tmpl/**/*.html', ['tmpl2js','compileJs']);
    gulp.watch('src/js/mod/setbg.js', ['compileJs']);
    gulp.watch('src/js/pkg/*.js', ['compileJs']);
});
