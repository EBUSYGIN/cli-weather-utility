import { promises } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const FILE_PATH = join(homedir(), 'cli-weather-utility.json');

export class StorageService {
  async saveKeyValue(key, value) {
    let data = {};
    if (await this.isExist(FILE_PATH)) {
      const file = await promises.readFile(FILE_PATH);
      data = JSON.parse(file);
    }
    data[key] = value;
    promises.writeFile(FILE_PATH, JSON.stringify(data));
  }

  async getKeyValueFromFile(key) {
    if (await this.isExist(path)) {
      const file = await promises.readFile(FILE_PATH);
      const data = JSON.parse(file);
      return data[key];
    }
    return undefined;
  }

  async isExist(path) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }
}
