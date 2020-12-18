import { Injectable } from '@angular/core';

import { NGXLogger, CustomNGXLoggerService, NgxLoggerLevel } from 'ngx-logger';
import { environment } from '@env';
import * as moment from 'moment';
import { BrowserInfoService } from './browser-info.service';
import { Constants } from '@core/infrastructure/constants';

@Injectable()
export class LoggerService {
    public _logger: NGXLogger;
    private logQueue: string[] = [];

    constructor(customLogger: CustomNGXLoggerService, private browserInfo: BrowserInfoService) {
        this._logger = customLogger.create(
            {
                serverLoggingUrl: environment.serverLoggingUrl,
                level: environment.logLevel,
                serverLogLevel: environment.serverLogLevel,
            });
    }

    private enqueueLog(message: string, logLevel: string) {
        if (environment.serverLogLevel !== NgxLoggerLevel.OFF) {
            const logLength = this.logQueue.push(`${moment().format()} ${logLevel} ${message}`);
            if (logLength > Constants.noOfLastLogsSendToServer * 2) {
                this.logQueue = this.logQueue.slice(logLength - Constants.noOfLastLogsSendToServer, logLength);
            }
        }
    }

    private getLastNLogs(): string[] {
        const logLength = this.logQueue.length;
        return this.logQueue.slice(
            logLength > Constants.noOfLastLogsSendToServer ? (logLength - Constants.noOfLastLogsSendToServer) : 0,
            logLength);
    }

    trace(message: string) {
        this.enqueueLog(message, 'TRACE');
        this._logger.trace(message);
    }

    debug(message: string) {
        this.enqueueLog(message, 'DEBUG');
        this._logger.debug(message);
    }

    info(message: string) {
        this.enqueueLog(message, 'INFO');
        this._logger.info(message);
    }

    log(message: string) {
        this.enqueueLog(message, 'LOG');
        this._logger.log(message);
    }

    warn(message: string) {
        this.enqueueLog(message, 'WARN');
        this._logger.warn(message);
    }

    // Note - logger.error/logger.fatal to be called only when we want log to post to server
    error(message: string) {
        this.enqueueLog(message, 'ERROR');
        this._logger.error(message, this.getLastNLogs(), this.browserInfo.getBrowserInfo()); // systemInfo, userIdentification
    }


    fatal(message: string) {
        this.enqueueLog(message, 'FATAL');
        this._logger.fatal(message, this.getLastNLogs(), this.browserInfo.getBrowserInfo());
    }
}
