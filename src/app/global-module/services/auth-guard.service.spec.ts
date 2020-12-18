import { AuthGuardService } from './auth-guard.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuardService', () => {

    let authGuard: AuthGuardService;
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const authMock = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);

    const loggerService = {
        info: (x) => { }
    };

    const token = { roleId: 2 };

    const user: any = {
        sessionId: 'sasass',
        userName: 'username',
        userId: 1,
        firstName: 'aaas',
        lastName: 'ssaas',
        entityName: 'wqqw',
        entityId: 1,
        role: 1,
        token
    };
    const sharedService = {
        get _sharedData() {
            return user;
        }
    };
    const authService = {
        isUserLoggedIn: (value: boolean = true) => {
            return value;
        }
    };
    beforeEach(() => {
        authGuard = new AuthGuardService(routerMock, loggerService as any, authMock, sharedService as any);
    });


    it('should check whether router navigates to unauthorize when role is not present', () => {
        authMock.isUserLoggedIn.and.returnValue(true);
        authGuard.currentUser = sharedService._sharedData;
        const route = new ActivatedRouteSnapshot();
        route.data = { roles: 'a' };
        const result = authGuard.canActivate(route, <RouterStateSnapshot>{  });
        expect (routerMock.navigate).toHaveBeenCalledWith (['/unauthorize']);
        expect(result).toBeFalsy();
    });

    it('should check whether router navigates to home when url is /', () => {
        authMock.isUserLoggedIn.and.returnValue(true);
        authGuard.currentUser = sharedService._sharedData;
        const route = new ActivatedRouteSnapshot();
        route.data = { roles: [2] };
        const result = authGuard.canActivate(route , <RouterStateSnapshot>{ url: '/' });
        expect (routerMock.navigate).toHaveBeenCalledWith (['/home']);
        expect(result).toBeTruthy();
    });

    it('should check whether router navigates to / when user is not logged in', () => {
        authMock.isUserLoggedIn.and.returnValue(false);
        authGuard.currentUser = sharedService._sharedData;
        const route = new ActivatedRouteSnapshot();
        route.data = { roles: 'a' };
        const result = authGuard.canActivate(route, <RouterStateSnapshot>{ url: '/route' });
        expect (routerMock.navigate).toHaveBeenCalledWith (['/']);
        expect(result).toBeFalsy();
    });

});
