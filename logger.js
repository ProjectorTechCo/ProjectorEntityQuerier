const winston = require("winston");
const expressWinston = require('express-winston');
const logger =  expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.json()
    ),
    meta: false,
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
});

module.exports = logger;