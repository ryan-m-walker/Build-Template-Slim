const gulp            = require('gulp');
const babel           = require('gulp-babel');
const plumber         = require('gulp-plumber');
const uglify          = require('gulp-uglify');
const sourcemaps      = require('gulp-sourcemaps');
const concat          = require('gulp-concat');
const sass            = require('gulp-sass');
const cssmin          = require('gulp-csso');
const autoprefixer    = require('gulp-autoprefixer');
const order           = require('gulp-order');
const browserSync     = require('browser-sync').create();


// CSS
gulp.task('css', () => 
  gulp.src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
          browsers: ['last 2 versions', 'ie 9'],
          cascade: false
        }))
        .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
);

// JS
gulp.task('js', () =>
  gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(order([
      'script.js'    
    ]))
    .pipe(sourcemaps.init())
          .pipe(babel({
            presets: ['env']
          }))
          .pipe(concat('scripts.js'))
          .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
);

// HTML
gulp.task('html', () => 
  gulp.src('src/html/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }))
);

// Browser-Sync
gulp.task('browserSync', () =>
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
);

// Watch
gulp.task('watch', ['css', 'js', 'html', 'browserSync'], () => {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.scss', ['css']);
  gulp.watch('src/html/**/*.html', ['html']);
});

// Default Task
gulp.task('default', ['watch']);