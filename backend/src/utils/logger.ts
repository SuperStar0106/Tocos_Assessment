class CustomLogger {
  log(...args) {
    console.log(...args);
  }

  info(...args) {
    console.info(...args);
  }

  error(...args) {
    console.error(...args);
  }
}

export const Logger = new CustomLogger;