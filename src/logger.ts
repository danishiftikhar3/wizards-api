import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
};

interface LoggerOptions {
  levels: { [key: string]: number };
  level: string;
}

const options: LoggerOptions = {
  levels,
  level: process.env.LOG_LEVEL || "info",
};

const logger = winston.createLogger({
  levels: options.levels,
  level: options.level,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;
