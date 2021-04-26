import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: true,
    environmentName: 'Staging',
    domain: 'dah.xpanxion.co.in',
    appUrl: 'http://172.26.21.9:83/',
    apiUrl: 'http://172.26.21.9:9043/api/',
    workbenchUrl:'https://aiworkbench.xpanxion.co.in:5672',
    nodeRedUrl: 'http://172.26.21.9:1880/',
    logLevel: NgxLoggerLevel.ERROR,
    serverLogLevel: NgxLoggerLevel.ERROR,
    serverLoggingUrl: 'https://dah.xpanxion.co.in:9007/api/logs'
};
