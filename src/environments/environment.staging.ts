import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: true,
    environmentName: 'Staging',
    domain: 'dah.xpanxion.co.in',
    appUrl: 'https://dah.xpanxion.co.in:9002/',
    apiUrl: 'https://dah.xpanxion.co.in:9007/api/',
    logLevel: NgxLoggerLevel.ERROR,
    serverLogLevel: NgxLoggerLevel.ERROR,
    serverLoggingUrl: 'https://dah.xpanxion.co.in:9007/api/logs'
};
