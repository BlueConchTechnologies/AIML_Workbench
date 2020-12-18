import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {
    LoggerService,
    AuthService
} from '@core';
import { SharedDataService } from './shared-data.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    currentUser: any;
    isUserLoggedIn: boolean;

    constructor(
        private _router: Router,
        private _logger: LoggerService,
        private _authService: AuthService,
        private _sharedService: SharedDataService
    ) {
        this._logger.info('AuthGuard : constructor ');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.isUserLoggedIn = this._authService.isUserLoggedIn();

        if (this.isUserLoggedIn) {
            if (state.url === '/') {
                this._router.navigate(['/home']);
            }
            return true;
        }
        // User Not Logged In
        else if (state.url !== '/') {
            this._router.navigate(['/']);
        }
        return false;
    }
}
