import {
    Injectable
} from '@angular/core';

import { LoggerService } from '@core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

    productAddedToCartNotification: Subject<null> = new Subject<null>();
    disableUINotification: Subject<null> = new Subject<null>();
    alertModalRequired: Subject<string> = new Subject<string>();
    confirmModalRequired: Subject<string> = new Subject<string>();


    constructor(
        private _logger: LoggerService
    ) {
        this._logger.info('NotificationService : constructor');
    }

    notifyProductAddedToCart() {
        this._logger.info('NotificationService : notifyNonCatalogProductAddedToCart');
        this.productAddedToCartNotification.next();
    }

    notifyDisableUI() {
        this._logger.info('NotificationService : notifyDisableUI');
        this.disableUINotification.next();
    }

    notifyAlertModalRequired(message) {
        this._logger.info('NotificationService : notifyAlertModalRequired');
        this.alertModalRequired.next(message);
    }

    notifyConfirmModalRequired(message) {
        this._logger.info('NotificationService : notifyConfirmModalRequired');
        this.confirmModalRequired.next(message);
    }

}
