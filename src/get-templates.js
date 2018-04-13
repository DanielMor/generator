import fs from 'fs';

class Template {
  constructor(action, extension) {
    this.action = action;
    this.extension = extension;
    this.name = action + '.' + extension;
  }
}

export default function (folder) {
  const files = fs.readdirSync(folder);

  return files.map((file) => {
    let data = file.split('.');
    return new Template(data[0], data[1]);
  });
}