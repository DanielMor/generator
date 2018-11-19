
module.exports = class Template {
  constructor(name, cmd, isDirectory, dest) {
    this.name = name;
    this.cmd = cmd;
    this.isDirectory = isDirectory;
    this.templates = dest;
  }
}
