const fs = require('fs');
const mkdirp = require('mkdirp');
const minimist = require('minimist');
const buildTemplate = require('string-template/compile');
const getTemplates = require('./get-templates');
const templates = require('../templates');

function getFileName(file, data) {
  return buildTemplate(file, true)(data).replace('.temp', '');
}

function generateFromDirectory(basePath, data, dest) {
  fs.readdirSync(basePath).forEach(file => {
    const isFile = fs.lstatSync(basePath + '/' + file).isFile();

    if (isFile) {
      generateFile(basePath, file, data, dest);
    } else {
      generateFromDirectory(basePath + '/' + file, data, dest + '/' + file);
    }
  });
}

function generateFile(basePath, fileName, data, location) {
  fs.readFile(basePath + '/' + fileName, 'utf8', (err, txt) => {
    if (err) throw err;

    let text = buildTemplate(txt, true)(data);
    let filePath =  location + '/' + getFileName(fileName, data);

    if (!fs.existsSync(location)){
      mkdirp.sync(location);
    }

    fs.writeFile(filePath, text, (err) => {
      if (!err) console.log('Saved  ' + filePath);
    });
  });
}

function run(template, args) {
  if (!template) {
    errorExit('Template not found')
  }

  try {
    const valid = template.args(args);

    if (!valid) {
      errorExit('Args not valid');
    }

    const data = template.data(args);

    generateFromDirectory(template.templates, data, data.folderName);
  } catch (e) {
    errorExit(`Cannot generating template: ${e.message}`);
  }
}

function errorExit(message) {
  console.log(`Error: ${message}`);
  process.exit(1);
}

const args = minimist(process.argv.slice(2));

run(templates.find((t) => t.cmd === args._[0]), args._.slice(1));
