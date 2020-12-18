import { Observable } from 'rxjs';
import { LoginComponent } from './login.component';



describe('LoginComponent', () => {
    let component: LoginComponent;
    const response = {
        username: 'user',
        password: 'pass'
    };

    const logger = {
        info: (y) => { },
        error: (m) => { }
    };
    const authServiece = {
        isUserLoggedIn: (x) => {
            return {};
        }
    };

    const loginservice = {
        logOn(request: any): Observable<any> {
            return Observable.of(response);
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
    const router = {
        navigate: () => {
            return {};
        }
    };

    const utilityService = {
        redirectToURL: (url) => { }
    };

    beforeEach(() => {
        // Initializes LoginComponent by injecting required services
        component = new LoginComponent(router as any, loginservice as any, logger as any,
            utilityService as any, toastService as any,
            authServiece as any);

        logger.info('LoginComponent');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check call for login"s if condition ', () => {
        spyOn(logger, 'info').and.callThrough();
        spyOn(toastService, 'showError').and.callThrough();

        component.model.emailAddress = '';
        component.model.isAuthInitiated = false;
        component.login();
        logger.info('LoginComponent');
        toastService.showError('No Email');
        expect(toastService.showError).toHaveBeenCalled();
        expect(component.model.emailAddress).toBeFalsy();
    });

    it('should check for login"s elseif condition', () => {
        spyOn(toastService, 'showError').and.callThrough();
        spyOn(loginservice, 'logOn').and.callThrough();

        component.model.emailAddress = 'email';
        component.model.password = '';
        component.model.isAuthInitiated = false;
        component.login();
        toastService.showError('No Password');
        expect(toastService.showError).toHaveBeenCalled();
        expect(component.model.password).toBeFalsy();
    });

    it('should check for login"s else condition', () => {
        spyOn(loginservice, 'logOn').and.callThrough();
        spyOn(logger, 'info').and.callThrough();


        component.model.emailAddress = 'email';
        component.model.password = 'password';
        component.model.isAuthInitiated = true;
        component.login();
        loginservice.logOn(component.model);
        logger.info('LoginComponet Success');
        expect(logger.info).toHaveBeenCalled();
        expect(loginservice.logOn).toHaveBeenCalled();
    });

    it('should check for login"s error response', () => {
        spyOn(logger, 'error').and.callThrough();
        spyOn(loginservice, 'logOn').and.callThrough();
        spyOn(component, 'resetModel').and.callThrough();

        loginservice.logOn(component.model);
        component.model.emailAddress = '';
        component.model.password = '';
        component.model.isAuthInitiated = false;
        component.resetModel();
        logger.error('Error Response');
        expect(component.resetModel).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalled();
        expect(loginservice.logOn).toHaveBeenCalled();
    });

    it('should check call for resetModel', () => {
        spyOn(logger, 'info').and.callThrough();
        spyOn(component, 'resetModel').and.callThrough();
        component.model.emailAddress = '';
        component.model.password = '';
        component.resetModel();
        logger.info('Reset Model');
        expect(component.resetModel).toHaveBeenCalled();
    });

    it('should check ngOnInit gets called', () => {
        spyOn(logger, 'info').and.callThrough();
        spyOn(authServiece, 'isUserLoggedIn').and.callThrough();
        spyOn(router, 'navigate').and.callThrough();

        component.ngOnInit();
        logger.info('Logger Component');
        component.showLogin = true;
        expect(logger.info).toHaveBeenCalled();
    });
});
