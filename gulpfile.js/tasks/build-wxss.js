const path = require('path');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const buildPath = path.join(__dirname, '../../src');

function buildWxss() {
  const pxRegExp = /(\d*\.?\d+)px/gi;
  const pxReplace = strArg => {
    const str = parseFloat(strArg);
    return str === 0 ? 0 : `${2 * str}rpx`;
  };

  return src([
    './src/**/*.scss',
    '!./src/scss/**/*.scss',
    '!./src/node_modules/**',
    '!./src/miniprogram_npm/**',
  ])
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: 'expanded',
        includePaths: './src/scss',
      }).on('error', sass.logError)
    )
    .pipe(replace(pxRegExp, pxReplace))
    .pipe(rename({ extname: '.wxss' }))
    .pipe(dest(buildPath));
}

module.exports = buildWxss;
