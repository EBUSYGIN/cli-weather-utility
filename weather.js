#!/usr/bin/env node

import { clArgsService } from './services/cl-args.service.js';

// initCLI();

class WeatherApp {
  run() {
    console.log(clArgsService.getCommandLineArguments(process.argv));
  }
}

const app = new WeatherApp();
app.run();
