#!/usr/bin/env node

import { weatherApiConstructor } from './services/api.service.js';
import { clArgsService } from './services/cl-args.service.js';
import { LogService } from './services/log.service.js';
import { WeatherRequest } from './services/request.service.js';
import { StorageService } from './services/storage.service.js';

class App {
  clArgsService = clArgsService;
  logService = new LogService();
  storageService = new StorageService();
  weatherRequestService = new WeatherRequest(weatherApiConstructor);

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

class WeatherApp extends App {
  constructor() {
    super();
  }
}

const app = new WeatherApp();
app.run();
