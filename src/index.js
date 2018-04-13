import fs from 'fs';
import mkdirp from 'mkdirp';
import minimist from 'minimist';
import buildTemplate from 'string-template/compile';
import getTemplates from './get-templates';

const TEMPLATES_FOLDER = './templates';
const args = minimist(process.argv.slice(2));

const action = args._[0].toLowerCase();
const name = args._[1].toLowerCase();
const nameResult = args.no ? capitalize(name) : capitalize(name)  + capitalize(action);
const template = getTemplates(TEMPLATES_FOLDER).find(isAction(action));

if(template) {
  generateFile(template)
} else {
  console.log('Template not found');
}

function generateFile(template) {
  fs.readFile(TEMPLATES_FOLDER + '/' + template.name, 'utf8', (err, data) => {
    if (err) throw err;

    let text = buildTemplate(data, true)({
      name: nameResult,
    });
    
    let folder = './' + action + '/'+ name;
    let filePath = folder + '/' + template.name;

    if (!fs.existsSync(folder)){
      mkdirp.sync(folder);
    }

    fs.writeFile(filePath, text, (err) => {
      if(!err) console.log('Saved  ' + filePath);
    });
  });
}


function isAction(action) {
  return (t) => t.action === action;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}