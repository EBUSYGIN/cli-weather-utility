#!/usr/bin/env node

import { clArgsService } from './services/cl-args.service.js';
import { LogService } from './services/log.service.js';

class App {
  clArgsService = clArgsService;
  logService = new LogService();

  run() {
    this.getArguments();
    if (this.args.h) this.logService.printHelp();
  }

  getArguments() {
    this.args = this.clArgsService.getCommandLineArguments(process.argv);
  }
}

class WeatherApp extends App {
  constructor() {
    super();
  }
}

const app = new WeatherApp();
app.run();
