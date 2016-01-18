const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tscConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');

const paths = {
  dist: 'dist',
  distFiles: 'dist/**/*',
  srcFiles: 'src/**/*',
  srcTsFiles: 'src/**/*.ts',
};

// clean the contents of the distribution directory
gulp.task('clean', function() {
  return del(paths.distFiles);
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src([paths.srcFiles, '!' + paths.srcTsFiles])
    .pipe(gulp.dest(paths.dist));
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
    'node_modules/es6-shim/es6-shim.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/http.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2-google-maps/bundles/angular2-google-maps.js',
  ])
  .pipe(gulp.dest('dist/lib'));
});

gulp.task('compile', ['clean'], function() {
  return gulp
    .src(paths.srcTsFiles)
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('tslint', function() {
  return gulp.src(paths.srcTsFiles)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});


gulp.task('build-watch', ['build'], function() {
  gulp.watch(paths.srcFiles, ['buildAndReload']);
});


gulp.task('build', ['clean', 'compile', 'copy:libs', 'copy:assets']);
gulp.task('buildAndReload', ['build']);
gulp.task('default', ['build']);
