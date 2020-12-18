import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { LoggerService } from '@core';

@Injectable()
export class FooterService {

    constructor(
        private _logger: LoggerService
    ) {
        this._logger.info('FooterService : constructor ');
    }

    getFooterSupportContactInfo(entityId: number): Observable<any> {

        this._logger.info('FooterService : getFooterSupportContactInfo ');

        return Observable.of('support@test.company');
    }
}
