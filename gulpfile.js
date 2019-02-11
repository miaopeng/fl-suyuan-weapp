const path = require('path');
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const scssToJson = require('scss-to-json');
const jeditor = require('gulp-json-editor');
const touch = require('gulp-touch-cmd');
 
const buildPath = path.join(__dirname, 'src');

const variablesFile = path.resolve(buildPath, 'scss/variables.scss');
// const appJSONFile = path.resolve(buildPath, 'app.json');

function buildWxss() {
  const pxRegExp = /(\d*\.?\d+)px/ig
  const pxReplace = (strArg) => {
      const str = parseFloat(strArg)
      return str === 0 ? 0 : `${2 * str}rpx`
  }

	return src([
    './src/**/*.scss',
    '!./src/scss/**/*.scss',
    '!./src/node_modules/**',
    '!./src/miniprogram_npm/**',
  ])
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded',
			includePaths: './src/scss'
    }).on('error', sass.logError))
    .pipe(replace(pxRegExp, pxReplace))
		.pipe(rename({ 'extname': '.wxss' }))
		.pipe(dest(buildPath));
}

function updateAppJSON() {
  const variables = scssToJson(variablesFile);
  console.log('color-brand:', variables['$color-brand']);
  return src('src/app.json')
  .pipe(jeditor({
    window:{
      backgroundColor: variables['$color-brand'],
      navigationBarBackgroundColor: variables['$color-brand']
    }
  }, {
      "max_preserve_newlines": "1",
      "preserve_newlines": true,
      "keep_array_indentation": false,
      "break_chained_methods": false,
      "indent_scripts": "normal",
      "brace_style": "collapse",
      "space_before_conditional": false,
      "unescape_strings": false,
      "jslint_happy": false,
      "end_with_newline": true,
      "wrap_line_length": "0",
      "indent_inner_html": false,
      "comma_first": false,
      "e4x": false
  })) 
  .pipe(dest(buildPath))
  .pipe(touch());
}

const build = series(buildWxss, updateAppJSON);
const watcher = function watcher () {
  watch('src/**/*.scss', build);
}

exports.build = build;
exports.watch = watcher;
exports.default = series(build, watcher);