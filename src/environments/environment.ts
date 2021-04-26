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
  apiUrl: 'http://localhost:9043/api/',
  workbenchUrl:'https://aiworkbench.xpanxion.co.in:5672',
  workbenchPublicUrl:'https://aiworkbench.xpanxion.co.in:5672',
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
  serverLoggingUrl: 'http://localhost:9043/api/logs',
  nodeRedUrl: 'http://localhost:1880/',
  dahUrl:'http://dah.xpanxion.co.in:9008/'
  
};
