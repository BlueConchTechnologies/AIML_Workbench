import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: true,
    environmentName: 'Staging',
    domain: 'dah.xpanxion.co.in',
    admin_username: 'aimlworkbenchblueconchtechcom',
    // admin_username: 'aimlworkbenchblueconchtechcom',

    appUrl: 'https://aimlworkbench.blueconchtech.com/',
    //appUrl:'http://aimlworkbench.blueconchtech.com/',
    apiUrl: 'https://aimlloginserver.blueconchtech.com/api/user/',
    // nodeRedUrl: 'https://172.26.21.9:1880/',
    // nodeRedUrl: 'http://localhost:1880/',
    nodeRedUrl: 'https://nodered.blueconchtech.com:1881/',
    workbenchUrl: 'https://aiworkbench.xpanxion.co.in:5672/',

    dahUrl: 'https://dah.blueconchtech.com:9008/',

    logLevel: NgxLoggerLevel.ERROR,
    serverLogLevel: NgxLoggerLevel.ERROR,
    serverLoggingUrl: 'https://dah.xpanxion.co.in:9007/api/logs'
    
};
