const fs = require('fs');
const path = require('path');
const scssToJson = require('scss-to-json');
const merge = require('merge');
const prettier = require('prettier');

const buildPath = path.join(__dirname, '../../src');
const variablesFile = path.resolve(buildPath, 'scss/variables.scss');
const appJSONFile = path.resolve(buildPath, 'app.json');

const updateAppJSON = done => {
  const variables = scssToJson(variablesFile);
  const colorBrand = variables['$color-brand'];
  const jsonString = fs.readFileSync(appJSONFile, 'utf8');
  const merged = merge.recursive(true, JSON.parse(jsonString), {
    window: {
      backgroundColor: colorBrand,
      navigationBarBackgroundColor: colorBrand,
    },
  });
  const result = prettier.format(JSON.stringify(merged), { parser: 'json' });
  // console.log(result);
  fs.writeFileSync(appJSONFile, result);
  done();
};

module.exports = updateAppJSON;
