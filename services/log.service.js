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
}
