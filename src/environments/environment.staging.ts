import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: true,
    environmentName: 'Staging',
    domain: 'dah.xpanxion.co.in',
    // appUrl: 'https://aimlworkbench.blueconchtech.com/',
    appUrl:'http://aimlworkbench.blueconchtech.com/',
    apiUrl: 'http://172.26.21.9:8080/api/user/',
    nodeRedUrl: 'http://172.26.21.9:1880/',
    workbenchUrl:'https://aiworkbench.xpanxion.co.in:5672',
    dahUrl:'http://dah-qa.blueconchtech.com:9008/',
    
    logLevel: NgxLoggerLevel.ERROR,
    serverLogLevel: NgxLoggerLevel.ERROR,
    serverLoggingUrl: 'https://dah.xpanxion.co.in:9007/api/logs'
};
