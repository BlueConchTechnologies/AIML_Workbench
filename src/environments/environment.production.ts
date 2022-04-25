import { NgxLoggerLevel } from 'ngx-logger';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  environmentName: 'Production',
  domain: '.client1.com',
  appUrl: 'http://172.26.21.9:81/AI-workbench/',
  apiUrl: 'https://aimlloginserver.blueconchtech.com/api/user/',
  //workbenchUrl : 'http://172.26.21.10:9003',
  workbenchUrl: 'https://aiworkbenchprod.xpanxion.co.in:5672',
  serverLogLevel: NgxLoggerLevel.ERROR,
  logLevel: NgxLoggerLevel.TRACE,
  serverLoggingUrl: 'http://172.26.21.9:9043/api/logs',
  // nodeRedUrl: 'https://172.26.21.9:1880/'
  nodeRedUrl: 'https://nodered.blueconchtech.com:1880/',
  // nodeRedUrl: 'https://localhost:1880/'
};
