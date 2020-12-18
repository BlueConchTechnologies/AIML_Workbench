import { Injectable, } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Constants } from '../infrastructure/constants';

import { SharedData } from './index';

import {
    AuthService,
    UtilityService,
    LoggerService
} from '@core';

import { HttpClient } from '@angular/common/http';
import { APIService } from './api.service';

@Injectable()
export class SharedDataService {

    public _sharedData: SharedData;
    public isDisableUIElements: boolean;

    constructor(
        private _logger: LoggerService,
        private _authService: AuthService,
        private _utilityService: UtilityService,
        private _apiService: APIService
    ) {
        this._logger.info('SharedDataService : constructor ');
    }


    populateCommonData(): Promise<any> {
        this._logger.info('SharedDataService : populateCommonData ');

        if (!this._authService.isUserLoggedIn()) {
            return;
        }

        const promise = this._apiService.get(`${Constants.webApis.getSharedData}`).toPromise();

        promise.then(
            (successResponse: SharedData) => {
            this._logger.info('SharedDataService : populateCommonData : successResponse ' + successResponse);
            this._sharedData = successResponse;
        })
            .catch(
            errorResponse => {
                this._logger.info('****** SharedDataService : populateCommonData : server returned error');
                this._logger.info('errorResponse : ' + errorResponse);
            });

        return promise;

    }

    handleError(errorResponse: any) {
        this._logger.info('****** SharedDataService : populateCommonData : server returned error');
        this._logger.info('errorResponse : ' + errorResponse);
    }
}

