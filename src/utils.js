const jsYaml = require('js-yaml');
const jsonYml = require('json-to-pretty-yaml');
const fs = require('fs');
const path = require('path');

async function ymltoJson(filename) {
  return jsYaml.safeLoad(await fs.readFileAsync(filename, 'utf8').then(data => data));
}

function jsontoYml(jsonData) {
  return jsonYml.stringify(jsonData);
}

function isDirectory(source) {
  return fs.lstatSync(source).isDirectory();
}

function getFeaturePath(source) {
  return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
}

module.exports = {
  ymltoJson,
  jsontoYml,
  getFeaturePath
};
