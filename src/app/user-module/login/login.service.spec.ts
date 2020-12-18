import { LoginService } from './login.service';


describe('LoginService', () => {
    let loginService: LoginService;

    // Mock form service response
    const httpClientService = {
        get: () => {
            { }
        },
        post: () => {
            { }
        }
    };

    const userToken = 'token';

    const request = {
        email: 'email',
        password: 'password'
    };

    const logger = {
        info: (y) => { },
        error: (m) => { }
    };

    beforeEach(() => {
        // Initializes from Service by  injecting HttpClient service
        loginService = new LoginService(httpClientService as any, logger as any);
    });

    it('should check for httpClientService method post call in logOn', () => {
        spyOn(httpClientService, 'post').and.callThrough();

        loginService.logOn(request);
        expect(httpClientService.post).toHaveBeenCalled();
    });

    it('should check for httpClientService method post call in onForgotClick', () => {
        spyOn(httpClientService, 'get').and.callThrough();

        loginService.onForgotClick();
        expect(httpClientService.get).toHaveBeenCalled();
    });

    it('should check for httpClientService method post call in resetPassword', () => {
        spyOn(httpClientService, 'get').and.callThrough();

        loginService.resetPassword(userToken);
        expect(httpClientService.get).toHaveBeenCalled();
    });

    it('should check for httpClientService method post call in setPassword', () => {
        spyOn(httpClientService, 'post').and.callThrough();

        loginService.setPassword(userToken);
        expect(httpClientService.post).toHaveBeenCalled();
    });
});
