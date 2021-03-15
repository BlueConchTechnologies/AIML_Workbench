import {
    Component
    , OnInit
} from '@angular/core';
import { LoggerService } from '@core';
import { TranslateService } from '@ngx-translate/core';

import {
    Event as RouterEvent,
    Router
} from '@angular/router';

import {
    NotificationService,
    SharedDataService,
    SharedData,
} from './global-module/index';

import {
    ConfigurationSettings,
    Constants
} from '@shared';

import {
    AuthService
} from '@core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    isUserLoggedIn = false;
    isAdmin = false;
    loggedUser: any;
    apiToken: any;


    constructor(
        private _logger: LoggerService,
        private _translate: TranslateService,
        private _router: Router,
        private _authService: AuthService,
        private _notificationService: NotificationService,
        private _sharedDataService: SharedDataService
    ) {

        this._logger.info('AppComponent : constructor ');

        this._logger.info('"AppComponent : constructor => language configured');

        this._logger.error('"AppComponent : constructor => this is a test log to check server logging');

        _translate.addLangs(ConfigurationSettings.supportedBrowserLanguages);
        _translate.setDefaultLang(ConfigurationSettings.fallbackBrowserLanguage);

        const browserLang = _translate.getBrowserLang();

        this._logger.info('AppComponent : constructor => Current browserLang Is :' + browserLang);

        const languageConfiguredForApplication = browserLang.match(
            ConfigurationSettings.supportedBrowserLanguages.join('|'))
            ? browserLang : ConfigurationSettings.fallbackBrowserLanguage;

        _translate.use(languageConfiguredForApplication);
        this._logger.info('AppComponent : constructor => Application language is set to :' + languageConfiguredForApplication);

    }

    ngOnInit() {
        this.isUserLoggedIn = this._authService.isUserLoggedIn();
        console.log('this.isUserLoggedIn',this.isUserLoggedIn)
    }

    onWindowResized(event: any) {

    }
}
