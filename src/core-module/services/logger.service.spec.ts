import { LoggerService } from './logger.service';
import { environment } from '@env';
import { NgxLoggerLevel } from 'ngx-logger';
import { Constants } from '@core/infrastructure';



describe('LoggerService', () => {
    let loggerservice: LoggerService;
    const customLogger = {
        create: () => {
            return {
                trace: () => { },
                enqueueLog: () => { },
                debug: () => { },
                info: () => { },
                log: () => { },
                warn: () => { },
                error: () => { },
                fatal: () => { }
            };
        }
    };
    const browserInfo = {
        getBrowserInfo: () => {
            { }
        }
    };
    const data = {
        message: '',
        loglevel: ''
    };

    const logQueue = {
        push: () => { },
        length: () => { },
        slice: () => { }
    };

    beforeEach(() => {
        loggerservice = new LoggerService(customLogger as any, browserInfo as any);
    });

    it('should check call for enqueueLog', () => {
        spyOn<any>(loggerservice, 'enqueueLog').and.callThrough();
        spyOn(logQueue, 'push').and.callThrough();

        const logLength = logQueue.push();
        environment.serverLogLevel = 5;
        loggerservice['enqueueLog'](data.message, data.loglevel);
        expect(loggerservice['enqueueLog']).toHaveBeenCalled();
    });

    // it('should check call for enqueueLog', () => {
    //     spyOn<any>(loggerservice, 'enqueueLog').and.callThrough();
    //     spyOn<any>(logQueue, 'slice').and.callThrough();

    //     const logLength = 300;
    //     loggerservice['logQueue'] = logQueue['slice']();
    //     loggerservice['enqueueLog'](data.message, data.loglevel);
    //     expect(loggerservice['enqueueLog']).toHaveBeenCalled();
    //     expect(logLength).toBeGreaterThan(Constants.noOfLastLogsSendToServer);
    // });

    it('trace method', () => {
        spyOn(loggerservice._logger, 'trace').and.callThrough();
        loggerservice.trace(data.message);
        expect(loggerservice._logger.trace).toHaveBeenCalled();
    });

    it('debug call', () => {
        spyOn(loggerservice._logger, 'debug').and.callThrough();
        loggerservice.debug(data.message);
        expect(loggerservice._logger.debug).toHaveBeenCalled();
    });

    it('info call', () => {
        spyOn(loggerservice._logger, 'info').and.callThrough();
        loggerservice.info(data.message);
        expect(loggerservice._logger.info).toHaveBeenCalled();
    });

    it('log call', () => {
        spyOn(loggerservice._logger, 'log').and.callThrough();
        loggerservice.log(data.message);
        expect(loggerservice._logger.log).toHaveBeenCalled();
    });

    it('warn call', () => {
        spyOn(loggerservice._logger, 'warn').and.callThrough();
        loggerservice.warn(data.message);
        expect(loggerservice._logger.warn).toHaveBeenCalled();
    });

    it('error call', () => {
        spyOn(loggerservice._logger, 'error').and.callThrough();
        loggerservice.error(data.message);
        expect(loggerservice._logger.error).toHaveBeenCalled();
    });

    it('fatal call', () => {
        spyOn(loggerservice._logger, 'fatal').and.callThrough();
        loggerservice.fatal(data.message);
        expect(loggerservice._logger.fatal).toHaveBeenCalled();
    });
});
