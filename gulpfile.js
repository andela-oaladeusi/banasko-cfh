'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');
const bower = require('gulp-bower');
const istanbul = require('gulp-istanbul');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

require('dotenv').config();
const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

// GET PATHS TO STATIC FILES
const paths = {
    scripts: ['public/js/**/*.js', 'app/**/*.js'],
    jade: ['app/views/**/*.jade'],
    public: ['public/**/*.*'],
    scss: ['public/css/sass/*.scss'],
    cssDest: 'public/css/'
};

// BOWER - Move bower dependencies to public folder
// SASS - Compile sass files to css
// INJECT - Inject static files into app
// LINT - Verify js files for errors
// PRETEST - Before running test, setup reporters
// TEST - Run tests
// NODEMON - Run server file
// SERVE - Launch development server
// WATCH - Listen for static file changes and reload
// DEFAULT TASKS - tasks as soon as gulp is started

// BOWER
gulp.task('bower', () => {
  return bower('./bower_components')
    .pipe(gulp.dest('public/lib'));
});

// SASS
gulp.task('sass', () => {
  const options = {
    outputStyle: 'compressed'
  };

  return gulp.src(paths.scss)
    .pipe(sass(options).on('error', sass.logError))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(browserSync.stream());
});

// LINT
gulp.task('lint', () => {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// PRETEST
gulp.task('pretest', () => {
  const options = {
    includeUntested: true
  };

  return gulp.src(['test/**/*.js'])
    .pipe(istanbul(options))
    .pipe(istanbul.hookRequire());
});

// TEST
gulp.task('test', ['pretest'], () => {
  const options = {
    istanbulOptions: {
      dir: './coverage',
      reporters: ['lcov'],
      reportOpts: { dir: './coverage' }
    },
    mochaOptions: {
      reporter: 'spec'
    }
  };

  return gulp.src(['test/server/**/*.js'], {read: false})
    .pipe(mocha(options.mochaOptions))
    .pipe(istanbul.writeReports(options.istanbulOptions))
    .once('error', () => { process.exit(1); })
    .once('end', () => { process.exit(); });
});

// NODEMON
gulp.task('nodemon', function (cb) {
  let started = false;
  const options = {
    script: 'server.js',
    env: { 'NODE_ENV': nodeEnv }
  };

  nodemon(options)
    .on('start', function () {
      // Callback used to ensure browser-sync
      // does not start before nodemon
      if (!started) {
        cb();
        started = true;
      }
    });
});

// SERVE
gulp.task('serve', ['nodemon'], () => {
  const options = {
    proxy: 'localhost:' + port,
    files: ['public/**/*.*'],
    port: 5000
  };

  browserSync.init(options);
});

// WATCH
gulp.task('watch', () => {
  // Watch Sass Files
  gulp.watch(paths.scss, ['sass']);

  // watch view files
  gulp.watch(paths.public).on('change', reload);

  // watch jade files
  gulp.watch(paths.jade).on('change', reload);
});

// DEFAULT
gulp.task('default', ['serve', 'sass', 'watch']);