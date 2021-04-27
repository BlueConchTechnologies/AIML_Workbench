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
//===========================================================
import {
    CaseStudyService
} from '../app/case-study/services/case-study.service';

import { SpinnerService } from '@core';
//============================================================

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    isUserLoggedIn = false;
    isAdmin = false;
    loggedUser: any;
    apiToken: any;

    pinToHomeScreen:any
    display_UseCases = false;
    spinnerActive = false;
    isErrorAvailable = false
    errMessage = ''
    preBuiltUsecases:any;
    pinToHomeArray = []


    constructor(
        private _logger: LoggerService,
        private _translate: TranslateService,
        private _router: Router,
        private _authService: AuthService,
        private _notificationService: NotificationService,
        private _sharedDataService: SharedDataService,
        private _caseStudyService: CaseStudyService,
        private spinner: SpinnerService
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
       //=============================================================================
        if (JSON.parse(localStorage.getItem("pinToHomeArray")) == null) {
        console.log(this.pinToHomeArray);
        console.log('condition true')
        var emptyArray = []
        localStorage.setItem("pinToHomeArray",JSON.stringify(emptyArray));
        console.log(this.pinToHomeArray);
        console.log('Array set to local storage');
         }
        this.pinToHomeScreenPreBuilt();
    }
    //=====================================================================================

    onWindowResized(event: any) {

    }

    //========================================================================================

pinToHomeScreenPreBuilt () {
    console.log(this.pinToHomeArray)
    console.log('inside the home screen')
    var preBuilt_usecaseId = "xpanxion"
      this._caseStudyService.getPrebuiltUseCases(preBuilt_usecaseId).subscribe(resp => {
        this.preBuiltUsecases = resp.records;
        console.log('Data Received');
        console.log('preBuiltusecaseList',this.preBuiltUsecases);
        this.pinToHomeScreenPreBuiltUsecase ()
  },
  (errorResponse) => {
    this.isErrorAvailable = true;
    this.errMessage = 'Server Error, Please contact system administrator';
    this.spinnerActive = this.spinner.stop()
    console.log(errorResponse)
  });
  }
  
  pinToHomeScreenPreBuiltUsecase () {
    console.log(this.pinToHomeArray)
    console.log('function calling home screen');
    this.pinToHomeArray = JSON.parse(localStorage.getItem("pinToHomeArray"))
    console.log(this.preBuiltUsecases);
    console.log(this.pinToHomeArray);
    for (var i = 0; i < this.preBuiltUsecases.length; i++) {
      console.log('inside loop');
      this.pinToHomeArray.push(this.preBuiltUsecases[i]) ;
      console.log('pinToArray',this.pinToHomeArray);
    }
  
    console.log ("pre built use case flow",this.pinToHomeArray)
    localStorage.setItem("pinToHomeArray",JSON.stringify(this.pinToHomeArray))
  }
  
  
  //============================================================================================
  
}
