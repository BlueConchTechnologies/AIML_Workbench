import { NgxLoggerLevel } from 'ngx-logger';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  environmentName: 'Dev',
  domain: '.client1.com',
  appUrl: 'http://localhost:4200/',
  
  apiUrl: 'http://localhost:8080/api/user/',
  //apiUrl: 'http://localhost:2000/api/user/',
  //apiUrl: 'http://172.26.21.9:8080/api/user/',
 // dahUrl:'http://localhost:4201/',
  dahUrl:'https://dah-qa.blueconchtech.com:9008/',
  workbenchUrl:'https://aiworkbenchprod.xpanxion.co.in:5672',
  workbenchPublicUrl:'https://aiworkbenchprod.xpanxion.co.in:5672',

  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
  serverLoggingUrl: 'http://localhost:9043/api/logs',
  nodeRedUrl: 'http://172.26.21.9:1880/',
  //nodeRedUrl: 'http://localhost:1880/',
  admin_username: 'aimlworkbenchblueconchtechcom'
  
};
