import {
    Component,
    Input
} from '@angular/core';

import {
    SpinnerService,
    LoggerService
} from '@core';

@Component({
    selector: 'spinner',
    templateUrl: 'spinner.component.html',
    styles: [
        `.top {
            margin-top: 60px;
            border-radius: 10px;
          }.spinnerImage {
            position: relative;
            top: 43%;
          }.spin {
            margin-left: 10px;
          }`
    ]
})
export class SpinnerComponent {
    public active: boolean = true;
    @Input() containerCssClass: string;

    public constructor
        (_spinner: SpinnerService,
            private _logger: LoggerService
        ) {
        this._logger.info('SpinnerComponent : constructor');
        _spinner.status.subscribe((status: boolean) => {
            this._logger.info('SpinnerComponent : subscribe => Status : ' + status);
            this.active = status;
        });
    }
}
