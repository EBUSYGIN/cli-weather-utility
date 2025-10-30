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

  async init() {
    this.token =
      process.env.TOKEN ??
      (await this.storageService.getKeyValueFromFile('token'));

    if (this.token) {
      this.weatherApiConstructor = new WeatherApiConstructor(this.token);
      this.weatherRequestService = new WeatherRequest(
        this.weatherApiConstructor
      );
    } else {
      this.logService.printError(
        'Проблема инициализации токена, перепроверьте файл или укажите токен через строку'
      );
    }
  }

  async runApp() {
    await this.init();
    await this.getArguments();
    await this.argsParser();
  }

  getArguments() {
    this.args = this.clArgsService.getCommandLineArguments(process.argv);
  }

  async argsParser() {
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

    if (this.args.s) this.getForecast();
  }

  async getForecast() {
    try {
      const weather = await this.weatherRequestService.getWeather(this.args.s);
      console.log(weather);
    } catch (e) {
      if (e?.response?.status == 404 || e?.response?.status === 400) {
        this.logService.printError('Проверьте правильность указания города');
      } else if (e?.response?.status == 401) {
        this.logService.printError(
          'Неверно указан токен авторизации или неуказан вообще'
        );
      } else {
        this.logService.printError(e.message);
      }
    }
  }
}

const app = new App();
app.runApp();
