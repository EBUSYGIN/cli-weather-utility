#!/usr/bin/env node

import { clArgsService } from './services/cl-args.service.js';
import { LogService } from './services/log.service.js';
import { WeatherRequest } from './services/request.service.js';
import { StorageService } from './services/storage.service.js';
import { WeatherApiConstructor } from './services/api.service.js';

class App {
  clArgsService = clArgsService;
  logService = new LogService();
  storageService = new StorageService();
  weatherApiConstructor = null;
  weatherRequestService = null;

  constructor() {
    this.initToken();
    this.initServices();
  }

  async initToken() {
    this.token =
      process.env.TOKEN ??
      (await this.storageService.getKeyValueFromFile('token'));
  }

  initServices() {
    this.weatherApiConstructor = new WeatherApiConstructor(this.token);
    this.weatherRequestService = new WeatherRequest(this.weatherApiConstructor);
  }

  run() {
    this.getArguments();
    this.argsHandler();
  }

  getArguments() {
    this.args = this.clArgsService.getCommandLineArguments(process.argv);
  }

  async argsHandler() {
    if (this.args.h) this.logService.printHelp();

    if (this.args.t) {
      if (!this.args.t.length) {
        this.logService.printError('Нет аргумента для токена');
        return;
      }

      try {
        await this.storageService.saveKeyValue('token', this.args.t);
        this.logService.printSuccess('Токен успешно сохранен');
      } catch (e) {
        this.logService.printError(e.message);
      }
    }

    this.weatherRequestService.getWeather('moscow');
  }
}

const app = new App();
app.run();
