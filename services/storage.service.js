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

  async isExist(path) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }
}
