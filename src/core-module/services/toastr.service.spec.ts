import { ToastrService } from './toastr.service';


describe('ToastrService', () => {
    let toastrservice: ToastrService;
    const logger = {
        info: (y) => { },
        error: (m) => { }
    };

    const translate = {
        get: () => {
            return {
                subscribe: (y) => { y(); }
            };
        }
    };

    const messageservice = {
        add: () => {
            { }
        }
    };

    const toastrcode = {
        success: 'success',
        info: 'info',
        warn: 'warn',
        error: 'error'
    };

    beforeEach(() => {
        // Initializes from Service by  injecting services
        toastrservice = new ToastrService(logger as any, translate as any, messageservice as any);
    });

    it('should check for showSuccess method', () => {
        spyOn(messageservice, 'add').and.callThrough();
        spyOn(toastrservice, 'getMessage').and.callThrough();

        toastrservice.showSuccess(toastrcode.success);
        toastrservice.getMessage(toastrcode.success);

        expect(messageservice.add).toHaveBeenCalled();
        expect(toastrservice.getMessage).toHaveBeenCalled();
    });

    it('should check for showInfo method', () => {
        spyOn(messageservice, 'add').and.callThrough();
        spyOn(toastrservice, 'getMessage').and.callThrough();

        toastrservice.showInfo(toastrcode.info);
        toastrservice.getMessage(toastrcode.info);

        expect(messageservice.add).toHaveBeenCalled();
        expect(toastrservice.getMessage).toHaveBeenCalled();
    });

    it('should check for showWarn method', () => {
        spyOn(messageservice, 'add').and.callThrough();
        spyOn(toastrservice, 'getMessage').and.callThrough();

        toastrservice.showWarn(toastrcode.warn);
        toastrservice.getMessage(toastrcode.warn);

        expect(messageservice.add).toHaveBeenCalled();
        expect(toastrservice.getMessage).toHaveBeenCalled();
    });

    it('should check for showError method', () => {
        spyOn(messageservice, 'add').and.callThrough();
        spyOn(toastrservice, 'getMessage').and.callThrough();

        toastrservice.showError(toastrcode.error);
        toastrservice.getMessage(toastrcode.error);

        expect(messageservice.add).toHaveBeenCalled();
        expect(toastrservice.getMessage).toHaveBeenCalled();
    });

    it('should check call for getMessage', () => {
        spyOn(translate, 'get').and.callThrough();
        spyOn(logger, 'info').and.callThrough();
        spyOn(toastrservice, 'getMessage').and.callThrough();

        toastrservice.getMessage(toastrcode);
        translate.get();

        expect(translate.get).toHaveBeenCalled();
        expect(logger.info).toHaveBeenCalled();
    });

});
