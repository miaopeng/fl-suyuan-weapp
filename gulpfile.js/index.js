const { parallel, series, watch } = require('gulp');

// Tasks
const updateAppJSON = require('./tasks/update-app-json');
const buildWxss = require('./tasks/build-wxss');
 
const builder = parallel(buildWxss, updateAppJSON);

const watcher = function watcher () {
  watch('src/**/*.scss', builder);
}

exports.build = builder;
exports.watch = watcher;
exports.updateAppJSON = updateAppJSON;
exports.default = series(builder, watcher);