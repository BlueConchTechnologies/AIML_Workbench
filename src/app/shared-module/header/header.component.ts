import {
    Component,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
    ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';

import { LoggerService, AuthService, UtilityService } from '@core';

import {
    NotificationService,
    SharedDataService
} from '@global';
import { LogoutComponent } from './logout/logout.component';
import { Constants } from '@shared/infrastructure';
import { environment } from '@env';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    @ViewChild('logout') logoutComp: LogoutComponent;

    subscriptions: Subscription[];
    isAdmin = false;
    cartCount: number;
    userName: string;
    loggedUser: any;

    constructor(
        private _router: Router,
        private _notificationService: NotificationService,
        private _sharedDataService: SharedDataService,
        private _utilityService: UtilityService,
        private _authService: AuthService

    ) {
        this.subscriptions = [];
    }

    ngOnInit() {
        this.subscriptions.push(
            this._notificationService.productAddedToCartNotification.subscribe(() => {
                this.cartCount = 10; // get from server
            })
        );
    }


    showLogoutConfirmation() {
        this.logoutComp.showConfirmationModal();
    }

    onLogoutConfirmation(eventData: boolean) {
        this._authService.logOut(Constants.webApis.logout)
            .subscribe(
                (successResponse) => {
                    localStorage.clear();
                    this._utilityService.redirectToURL(environment.appUrl);
                },
                (errorResponse) => {
                    localStorage.clear();
                    this._utilityService.redirectToURL(environment.appUrl);
                });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => {
            s.unsubscribe();
        });
    }

}
