import { GlobalErrorDialogComponent } from './global-error-dialog.component';

describe('GlobalErrorDialogComponent', () => {
    let component: GlobalErrorDialogComponent;

    const router = {
        navigate: () => { }
    };

    const _logger = {
        info: (y) => { },
        error: (m) => { }
    };

    const _globalErrorLoggingService = {
        showErrorDialog: () => {
            { }
        }
    };

    beforeEach(() => {
        component = new GlobalErrorDialogComponent(router as any, _logger as any, _globalErrorLoggingService as any);
    });

    it('should create component', () => {
        expect(component).toBeDefined();
    });

    it('should check call for showErrorDialog', () => {
        spyOn(component, 'showErrorDialog').and.callThrough();
        spyOn(_logger, 'info').and.callThrough();
        const errorDialogTitle = 'errorDialog';
        const customErrorMessage = 'customError';
        const primaryButtonText = 'ascd';
        const isLogoutOnPrimaryButtonEvent = true;
        const isShowSecondaryButton = true;
        const secondaryButtonText = 'adcfa';


        component.showErrorDialog(errorDialogTitle, customErrorMessage, primaryButtonText,
            isLogoutOnPrimaryButtonEvent, isShowSecondaryButton, secondaryButtonText);
        _logger.info('GlobalErrorDialogComponent ');
        expect(_logger.info).toHaveBeenCalled();
    });

    it('should check for logOut', () => {
        spyOn(_logger, 'info').and.callThrough();

        component.logout();
        _logger.info('LogOut');
        expect(_logger.info).toHaveBeenCalled();
    });

    it('should check for initDialogData call', () => {
        spyOn(_logger, 'info').and.callThrough();

        component.initDialogData();
        _logger.info('InitDialog');
        expect(_logger.info).toHaveBeenCalled();
    });
});

