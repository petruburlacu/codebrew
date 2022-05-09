import pino from 'pino';
const pretty = require('pino-pretty');
export const LOGGER = pino(pretty(
    {
        colorize: true,
        levelFirst: true,
        translateTime: "dd-mm-yyyy, h:MM:ss TT",
        ignore: "host, pid"
    }
));
