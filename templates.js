const Template = require('./src/template');
const { toCamelCase, toKebabCase } = require('./src/helpers');

module.exports = [{
  name: 'ReactComponent',
  cmd: 'rcc',
  isDirectory: true,
  templates: 'temps/react-component',
  args: (args) => {
    return args.length;
  },
  data: (args) => {
    const name = args[0];

    return {
      name,
      folderName: toKebabCase(name),
      className: toCamelCase(name),
    };
  }
}];