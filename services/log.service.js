import chalk from 'chalk';

export class LogService {
  printError(error) {
    console.log(chalk.bgRed(`ERROR ${error}`));
  }

  printSuccess(message) {
    console.log(chalk.bgGreen(`SUCCESS ${message}`));
  }

  printHelp() {
    console.log(
      `${chalk.bgCyan('HELP')} 
      Без параметров - вывод погоды
      -s [CITY] для установки города
      -h вывод помощи
      -t [API_KEY] для установки токена
      `
    );
  }

  printWeather(response) {
    console.log(
      `${chalk.bgMagenta('WEATHER')} Погода в городе: ${response.name}
      ${response.weather[0].description}
      Температура: ${response.main.temp} (ощущается как ${
        response.main.feels_like
      })
      Влажность: ${response.main.humidity}
      Скорость ветра: ${response.wind.speed}
      `
    );
  }
}
