import winston from 'winston'

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: process.env.NODE_ENV === `production` ? `debug` : `test`,
      colorize: true,
      timestamp: () => {
        let date = new Date().toISOString().
          replace(/T/, ' ').
          replace(/\..+/, '')
        return `[${date}]`
      },
    }),
  ],
})

export default logger
