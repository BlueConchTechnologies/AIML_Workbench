import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: true,
    environmentName: 'Staging',
    domain: 'dah.xpanxion.co.in',
    appUrl: 'https://dah.xpanxion.co.in:9002/',
    apiUrl: 'https://dah.xpanxion.co.in:9007/api/',
    workbenchUrl:'https://aiworkbench.xpanxion.co.in:5672',
    testUserId: 'banu', //'akamble',
    nodeRedUrl: 'http://localhost:1880/',
    logLevel: NgxLoggerLevel.ERROR,
    serverLogLevel: NgxLoggerLevel.ERROR,
    serverLoggingUrl: 'https://dah.xpanxion.co.in:9007/api/logs'
};
