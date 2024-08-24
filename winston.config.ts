import { createLogger, format, transports } from 'winston';
import { FileTransportOptions } from 'winston/lib/winston/transports';

const fileTransportOptions: FileTransportOptions = {
  filename: 'logs/nestjs.log',
  level: 'debug',
  maxsize: 5242880,
  maxFiles: 5,
  tailable: true,
};

const colorizeFormatter = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize({
    all: true,
    colors: {
      info: 'blue',
      warn: 'yellow',
      error: 'red',
      debug: 'cyan',
    },
  }),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  }),
);

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new transports.File(fileTransportOptions),

    new transports.Console({
      format: colorizeFormatter,
    }),
  ],
  exitOnError: false,
});

export default logger;
