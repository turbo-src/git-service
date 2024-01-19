const fs = require('fs');
const path = require('path');

class JsonKeyValueStore {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
    this.data = {};

    this._readFile();
  }

  _readFile() {
    if (fs.existsSync(this.filePath)) {
      this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    }
  }

  _writeFile() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
  }

  getValue(key) {
    return this.data[key];
  }

  setValue(key, value) {
    this.data[key] = value;
    this._writeFile();
  }
}

module.exports = JsonKeyValueStore;