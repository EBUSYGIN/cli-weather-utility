class ClArgsService {
  static #instance = null;

  constructor() {
    if (ClArgsService.#instance) {
      throw new Error('Используйте ClArgsService.getInstance() вместо of new');
    }
    ClArgsService.#instance = this;
  }

  static getInstance() {
    if (!ClArgsService.#instance) {
      ClArgsService.#instance = new ClArgsService();
    }

    return ClArgsService.#instance;
  }

  getCommandLineArguments(commandLineArguments) {
    const args = {};
    const [, , ...clArgs] = commandLineArguments;
    clArgs.forEach((value, index, argumentsArray) => {
      if (value.charAt(0) === '-') {
        if (index === argumentsArray.length - 1)
          args[value.substring(1)] = true;
        else if (argumentsArray[index + 1].charAt(0) !== '-')
          args[value.substring(1)] = argumentsArray[index + 1];
        else {
          args[value.substring(1)] = true;
        }
      }
    });

    return args;
  }
}

export const clArgsService = ClArgsService.getInstance();
