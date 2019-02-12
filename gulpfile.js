const fs = require('fs');
const path = require('path');
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const scssToJson = require('scss-to-json');
const merge = require('merge');
const prettier = require('prettier');
 
const buildPath = path.join(__dirname, 'src');

const variablesFile = path.resolve(buildPath, 'scss/variables.scss');
const appJSONFile = path.resolve(buildPath, 'app.json');

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

const updateAppJSON = (done) => {
  const variables = scssToJson(variablesFile);
  const colorBrand = variables['$color-brand'];
  const jsonString = fs.readFileSync(appJSONFile, 'utf8');
  const merged = merge.recursive(true, JSON.parse(jsonString), {
    window:{
      backgroundColor: colorBrand,
      navigationBarBackgroundColor: colorBrand,
    }
  })
  const result = prettier.format(JSON.stringify(merged), { parser: 'json'});
  // console.log(result);
  fs.writeFileSync(appJSONFile, result);
  done();
}

const build = series(buildWxss, updateAppJSON);
const watcher = function watcher () {
  watch('src/**/*.scss', build);
}

exports.build = build;
exports.watch = watcher;
exports.updateAppJSON = updateAppJSON;
exports.default = series(build, watcher);