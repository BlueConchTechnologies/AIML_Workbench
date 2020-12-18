import { GlobalErrorHandlerService } from './global-error-handler.service';

describe('ErrorHandlerService', () => {
    let globalErrorHandlerServie: GlobalErrorHandlerService;

    const _globalErrorLoggingService = {

    };
    const _options = {

    };
    const _logger = {
        info: (y) => { },
        error: (m) => { }
    };

    const error = {
        status : 0,
        error: 'invalid'
    };
    const _spinner = {
        stop: () => { }
    };

    const _utilityService = {
        redirectToURL: (url) => { }
    };

    const _authService = {};
    const _config = {
        appUrl: (x) => { }
    };

    beforeEach(() => {
        globalErrorHandlerServie = new GlobalErrorHandlerService(_globalErrorLoggingService as any, _options as any,
            _logger as any, _spinner as any, _utilityService as any, _authService as any, _config as any);
    });

    it('should check call for handleError', () => {
        spyOn(_logger, 'info').and.callThrough();
        spyOn(_logger, 'error').and.callThrough();

        const url = 'login';
        error.error = 'invalid';
        error.status = 0;
        globalErrorHandlerServie.handleError(error);
        expect(_logger.info).toHaveBeenCalled();
        expect(_logger.error).toHaveBeenCalled();
    });

    it('should check call for else condition in handleError', () => {
        spyOn(_logger, 'info').and.callThrough();
        spyOn(_logger, 'error').and.callThrough();
        spyOn(_utilityService, 'redirectToURL').and.callThrough();
        spyOn(_spinner, 'stop').and.callThrough();

        const url = 'login';
        error.error = 'invalid';
        error.status = 401;
        globalErrorHandlerServie.handleError(error);
        _utilityService.redirectToURL(url);
        _spinner.stop();
        expect(_logger.info).toHaveBeenCalled();
        expect(_logger.error).toHaveBeenCalled();
        expect(_utilityService.redirectToURL).toHaveBeenCalled();
        expect(_spinner.stop).toHaveBeenCalled();
    });
});
