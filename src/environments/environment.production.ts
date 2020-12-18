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
  apiUrl: 'http://172.26.21.9:9043/api/',
  //workbenchUrl : 'http://172.26.21.10:9003',
  workbenchUrl: 'http://121.244.33.115:9003',
  serverLogLevel: NgxLoggerLevel.ERROR,
  logLevel: NgxLoggerLevel.TRACE,
  serverLoggingUrl: 'http://172.26.21.9:9043/api/logs',
  nodeRedUrl: 'http://172.26.21.9:1880/'
};
