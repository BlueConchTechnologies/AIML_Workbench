import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;

    const _logger = {
        info: (y) => { },
        error: (m) => { }
    };

    const http = {
        get: (x) => {
            { }
        }
    };

    beforeEach(() => {
        authService = new AuthService(_logger as any, http as any);
    });

    it('should check call for getAPIToken', () => {
        spyOn(authService, 'getAPIToken').and.callThrough();

        authService.getAPIToken();
        expect(authService.getAPIToken).toHaveBeenCalled();
    });

    it('should check call for isUserLoggedIn', () => {
        spyOn(authService, 'isUserLoggedIn').and.callThrough();

        authService.isUserLoggedIn();
        expect(authService.isUserLoggedIn).toHaveBeenCalled();
    });

    it('should check logOut method gets called or no', () => {
        spyOn(authService, 'logOut').and.callThrough();

        const url = 'path';
        authService.logOut(url);
        expect(authService.logOut).toHaveBeenCalled();
        expect(url).toBeTruthy();
    });
});

