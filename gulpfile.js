'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');
const bower = require('gulp-bower');
const istanbul = require('gulp-istanbul');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const bSync = require('browser-sync').create();

require('dotenv').config();
const PORT = process.env.PORT;

// Get all paths
const PATHS = {
    scripts: ['public/js/**/*.js', 'app/**/*.js'],
    test: ['test/server/**/*.js'],
    jade: ['app/views/**/*.jade'],
    html: ['public/views/*.html'],
    scss: ['public/css/common.scss'],
    css: ['public/css/*.css']
};

// Get destination directories
const CSSDEST = 'public/css/';

// Watch files
gulp.task('watch', () => {
  gulp.watch(PATHS.jade).on('change', bSync.reload);
  gulp.watch(PATHS.scripts).on('change', bSync.reload);
  gulp.watch(PATHS.html).on('change', bSync.reload);
  gulp.watch(PATHS.sass, ['sass']);
  gulp.watch(PATHS.css, bSync.reload);
});

// Lint scripts
gulp.task('lint', () => {
return gulp.src(PATHS.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish', {
    verbose: true
  }));
});

// Synchronise with browser for auto reload
gulp.task('bSync', ['nodemon'], () => {
  bSync.init({
    proxy: 'localhost:'+ PORT,
    files: ['public/**/*.*'],
    port: 5000,
    ui: {
      port: 5001
    },
    reloadOnRestart: true,
  });
});

gulp.task('reload', function () {
    console.log('reload');
    livereload();
});

// NODEMON
gulp.task('nodemon', function (cb) {
  let started = false;

  return nodemon({
    script: 'server.js'
  }).on('start', function () {
    // Callback used to ensure browser-sync does not start before nodemon
    if (!started) {
      cb();
      started = true;
    }
  });
});

// Pre-test
gulp.task('preTest', () => {
  return gulp.src(PATHS.test)
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

// Mocha-test
gulp.task('mochaTest', ['preTest'], () => {
  const options = {
    dir: './coverage',
    reporters: [ 'lcov' ],
    reportOpts: {
      dir: './coverage'
    },
  };

  return gulp.src(PATHS.test)
      .pipe(mocha({reporter: 'spec'}))
      .pipe(istanbul.writeReports(options))
      .on('end', () => {
          process.exit();
      });
});

// Sass
gulp.task('sass', () => {
  const options = {
    outputStyle: 'compressed'
  };

  return gulp.src(PATHS.scss)
    .pipe(sass(options).on('error', sass.logError))
    .pipe(gulp.dest(CSSDEST));
});

// Bower
gulp.task('bower', () => {
  return bower('./bower_components')
    .pipe(gulp.dest('public/lib'));
});

// REGISTER DEFAULTS

// default - ['jshint', 'bSync', 'watch', 'sass']
gulp.task('default', ['lint', 'bSync', 'watch', 'sass']);

// test - ['mochatest']
gulp.task('test', ['mochaTest']);

// install - ['bower']
gulp.task('install', ['bower']);