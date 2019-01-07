const path = require('path');
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const buildPath = path.join(__dirname, '.');

function buildWxss() {
  const pxRegExp = /(\d*\.?\d+)px/ig
  const pxReplace = (strArg) => {
      const str = parseFloat(strArg)
      return str === 0 ? 0 : `${2 * str}rpx`
  }

	return src(['./**/*.scss', '!./scss/**/*.scss'])
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded',
			includePaths: './scss'
    }).on('error', sass.logError))
    .pipe(replace(pxRegExp, pxReplace))
		.pipe(rename({ 'extname': '.wxss' }))
		.pipe(dest(buildPath));
}

const build = series(buildWxss);
const watcher = function watcher () {
  watch('./**/*.scss', buildWxss);
}

exports.build = build;
exports.watch = watcher;
exports.default = series(build, watcher);