let loggers = {};
let config = undefined;

function writeLog(loggerName: string, level: logLevel, message: string): void {
  if (!config || config.loggingRules.length === 0) {
    throw new Error('Logging framework is not configured');
  }

  for (let rule of config.loggingRules) {
    if ((rule.pattern === '*' || rule.pattern === loggName) && level <= rule.minLevel) {
      let target = rule.logTarget;
      target.write({
        loggerName: loggerName,
        message: message,
        logLevel: level,
        timeStamp: new Date()
      });
    }
  }
}

interface LogEventInfo {
  message: string;
  logLevel: logLevel;
  loggerName: string;
  timeStamp: Date;
}

interface LogTarget {
  write(logEventInfo: logEventInfo): void;
}

class Logger {
  constructor(name: string, writeLog) {
    this.name = name;
    this.writeLog = writeLog;
  }

  error(message: string): void {
    this.writeLog(this.name, logLevel.error, message);
  }

  warning(message: string): void {
    this.writeLog(this.name, logLevel.warning, message);
  }

  info(message: string): void {
    this.writeLog(this.name, logLevel.info, message);
  }

  debug(message: string): void {
    this.writeLog(this.name, logLevel.debug, message);
  }
}

function getLogLevelString(level: logLevel): string {
  switch (level) {
    case 1:
      return 'Error';
      break;
    case 2:
      return 'Warning';
      break;
    case 3:
      return 'Info';
      break;
    case 4:
      return 'Debug';
      break;
    default:
      return 'None';
  }
}

export const logLevel = {
  none: 0,
  error: 1,
  warning: 2,
  info: 3,
  debug: 4
};

/**
* Configure logging with the specified configuration.
*/
export function configure(configuration: LoggingConfiguration): void {
  config = configuration;
}

/**
* Gets the logger with the specified name.
*/
export function getLogger(name: string): Logger {
  return loggers[name] || (loggers[name] = new Logger(name, writeLog));
}

/**
* Logging rule
*/
export class LoggingRule {
  constructor(pattern: string, minLevel: logLevel, logTarget: LogTarget) {
    this.pattern = pattern;
    this.minLevel = minLevel;
    this.logTarget = logTarget;
  }
}

/**
* Logging configuration.
*/
export class LoggingConfiguration {
  constructor() {
    this.loggingRules = [];
  }

  addRule(rule: LoggingRule): void {
    if (!rule) {
      throw new Error('Invalid logging rule');
    }
    this.loggingRules.push(rule);
  }
}

/**
* Console log target
*/
export class ConsoleLogTarget {
  write(logEventInfo: LogEventInfo): void {
    console.log('[' + logEventInfo.timeStamp.toLocaleTimeString() + '] ' +
                '[' + getLogLevelString(logEventInfo.logLevel) + '] ' +
                '[' + logEventInfo.loggerName + ']: ' +
                logEventInfo.message);
  }
}
