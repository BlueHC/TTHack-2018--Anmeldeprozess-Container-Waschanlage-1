import * as winston from "winston";
import {LOG_LEVEL} from "../config/config";

export const logger = (() => {
    return new winston.Logger({
        level: LOG_LEVEL,
        transports: [
            new winston.transports.Console({colorize: true, timestamp: true}),
            new winston.transports.File({filename: "events.log"}),
        ],
        exitOnError: false
    })
})();