const 
  gulp            = require('gulp'),
  babel           = require('gulp-babel'),
  plumber         = require('gulp-plumber'),
  uglify          = require('gulp-uglify'),
  sourcemaps      = require('gulp-sourcemaps'),
  concat          = require('gulp-concat'),
  sass            = require('gulp-sass'),
  cssmin          = require('gulp-csso'),
  autoprefixer    = require('gulp-autoprefixer'),
  order           = require('gulp-order'),
  imagemin        = require('gulp-imagemin'),
  browserSync     = require('browser-sync').create()
;

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

// Images
gulp.task('images', () =>
	gulp.src('src/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/images/'))
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
gulp.task('watch', ['css', 'js', 'html', 'images', 'browserSync'], () => {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.scss', ['css']);
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/images/**/*', ['images']);
});

// Default Task
gulp.task('default', ['watch']);