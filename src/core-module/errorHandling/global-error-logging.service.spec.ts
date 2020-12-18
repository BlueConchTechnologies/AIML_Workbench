import { GlobalErrorLoggingService } from './global-error-logging.service';
import { HttpError, ErroNotificationType } from '@core/extensions/http-error.model';
import { Observable } from 'rxjs-compat/Observable';

export enum ErrorCode {
    Swallow = <any>'None',
    Fatal = <any>'Fatal',

    BR001 = <any>'BR001',
    BR002 = <any>'BR002',

    AuthFailedInvalidAuthResponse = <any>'AuthFailedInvalidAuthResponse',
    UserSessionExpired = <any>'UserSessionExpired'
}

export function showErrorDialog(errorDialogTitle: string, customErrorMessage: string, primaryButtonText: string
    , isLogoutOnPrimaryButtonEvent: boolean, isShowSecondaryButton: boolean, secondaryButtonText: string) {
}

describe('GlobalErrorService', () => {
    let globalerrorService: GlobalErrorLoggingService;

    const _logger = {
        info: (y) => { },
        error: (m) => { }
    };

    const successResponse = {
        title: 'abc',
        message: 'xyz',
        primaryButton: 'primaryButton',
        secondaryButton: 'secButton',
        isShowSecondaryButton: true,
        isLogoutOnPrimaryButton: true

    };


    const _translate = {
        get(errorCode: string): Observable<any> {
            return Observable.of(successResponse);
        }

    };

    const toastService = {
        showSuccess: (x) => {
            return {
                subscribe: (y) => { y(); }
            };
        },
        showError: (x) => {
            return {
                subscribe: (y) => { y(); }
            };
        }
    };

    beforeEach(() => {
        globalerrorService = new GlobalErrorLoggingService(_logger as any, _translate as any, toastService as any);
        globalerrorService.showErrorDialog = showErrorDialog.bind(this);

    });

    it('should check for logError"s else condition', () => {
        spyOn(_translate, 'get').and.callThrough();
        const erroNotificationType: ErroNotificationType = null;
        let error: HttpError;
        const cd: ErrorCode = null;
        error = new HttpError(cd as any, erroNotificationType as any, null, null);
        error.erroNotificationType = ErroNotificationType.Dialog;
        globalerrorService.logError(error, true, true);
        expect(_translate.get).toHaveBeenCalled();

    });


    it('should check for unhandled Exception', () => {
        const error = '';
        globalerrorService.logError(error, true, true);
    });
});
