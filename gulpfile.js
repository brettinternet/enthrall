var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    print = require('gulp-print'),
    babel = require('gulp-babel');
    // babel-preset-es2015
    // --save-dev vs. --save
    // npm install --only=production

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('clean', function(cb) {
  del([
    'dist'
  ], cb);
});

// TESTING
gulp.task('watch', function() {
    return gulp.watch(['./index.html','./views/*.html', './js/templates/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
});

gulp.task('build', ['clean', 'build-css', 'build-js'],
function() {
   return gulp.src('index.html')
      .pipe(cachebust.references())
      .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {
  gulp.src([
      'styles/**/*.*css',
      'styles/*.*css',
    ])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-js', function() {
   return gulp.src([
        'js/app.js',
        'js/*Service.js',
        'js/**/*.js',
      ])
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
});


//#######################################//

// PRODUCTION
gulp.task('watch-prod', function() {
    return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js'], ['build-prod']);
});

gulp.task('build-prod', ['clean', 'build-css-prod', 'build-js-prod'],
function() {
   return gulp.src('index.html')
      .pipe(cachebust.references())
      .pipe(gulp.dest('dist'));
});

gulp.task('build-css-prod', function() {
  gulp.src('./styles/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-js-prod', function() {
   return gulp.src('js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
});
