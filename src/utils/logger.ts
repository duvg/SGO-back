import { timeStamp } from 'console';
import { createLogger, format, transports, config} from 'winston';
const { combine, timestamp, json } = format;

export const userLogger = createLogger({
    levels: config.syslog.levels,
    defaultMeta:{ component: 'user-service' },
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'src/logs/auth.log'})
    ]
});

export const errorLogger = createLogger({
    transports: [
        new transports.Console()
    ],
    exceptionHandlers: [
        new transports.Console(),
        new transports.File({filename: 'error_combined.log'})
    ]
})




