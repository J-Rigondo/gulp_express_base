import gulp from 'gulp';
import sass from 'gulp-sass';
import browserify from 'gulp-browserify';
import nodeSass from 'node-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-csso';
import del from 'del';
import babel from 'babelify';

sass.compiler = nodeSass;

const paths = {
  styles: {
    src: 'assets/scss/styles.scss',
    dest: 'src/static/styles',
    watch: 'assets/scss/**/*.scss'
  },
  js: {
    src: 'assets/js/main.js',
    dest: 'src/static/js',
    watch: 'assets/js/**/*.js'
  }
};

const clean = () => {
  return del('src/static/styles');
};

const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
};

const js = () => {
  return gulp
    .src(paths.js.src)
    .pipe(
      browserify({
        transform: [
          babel.configure({
            presets: ['@babel/preset-env']
          })
        ]
      })
    )
    .pipe(gulp.dest(paths.js.dest));
};

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

const dev = gulp.series([clean, styles, js, watchFiles]);

export default dev;
