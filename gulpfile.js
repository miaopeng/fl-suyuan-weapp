const path = require('path');
const del = require('del');
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const buildPath = path.join(__dirname, 'dist');

function clean () {
  return del(buildPath);
}

function buildWxss() {
  const pxRegExp = /(\d*\.?\d+)px/ig
  const pxReplace = (strArg) => {
      const str = parseFloat(strArg)
      return str === 0 ? 0 : `${2 * str}rpx`
  }

	return src('src/**/*.scss')
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded',
			includePaths: 'src/scss'
    }).on('error', sass.logError))
    .pipe(replace(pxRegExp, pxReplace))
		.pipe(rename({ 'extname': '.wxss' }))
		.pipe(dest(buildPath));
}

function copy() {
  return src([
    'src/**',
    '!src/**/*.scss'
  ]).pipe(dest(buildPath));
}

const build = series(copy, buildWxss);
const watcher = function() {
  watch('src/**/*.(js|wxml)', copy);
  watch('src/**/*.scss', buildWxss);
}

exports.clean = clean;
exports.build = build;
exports.watch = watcher;
exports.default = series(clean, build, watcher);