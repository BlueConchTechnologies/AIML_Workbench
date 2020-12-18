import { ValidationService } from './validation.service';

describe('ValidationService', () => {
    let validationservice: ValidationService;

    const _logger = {
        info: (y) => { },
        error: (m) => { }
    };

    beforeEach(() => {
        validationservice = new ValidationService(_logger as any);
    });

    it('should check for isNumberKey call', () => {
        spyOn(_logger, 'info').and.callThrough();

        const event: any = '';
        validationservice.isNumberKey(event);
        _logger.info('ValidationService : isNumberKey');
        expect(_logger.info).toHaveBeenCalled();
    });

    it('should check for isEnterKey regExpValidator  call', () => {
        spyOn(_logger, 'info').and.callThrough();

        const event: any = '';
        validationservice.isEnterKey(event);
        _logger.info('ValidationService : isEnterKey');
        expect(_logger.info).toHaveBeenCalled();
    });

    it('should check for regExpValidator  call', () => {
        spyOn(_logger, 'info').and.callThrough();

        const regExPattern = '';
        const valueToValidate = '';
        validationservice.regExpValidator(regExPattern, valueToValidate);
        _logger.info('ValidationService : regExpValidator');
        expect(_logger.info).toHaveBeenCalled();
    });
});
