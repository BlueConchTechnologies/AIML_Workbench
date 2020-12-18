﻿import {
    Directive,
    ElementRef,
    AfterViewInit
} from '@angular/core';

import { LoggerService } from '@core';
import { NotificationService } from '@global';

declare var $: any;

@Directive({
    selector: '[enableDisable]'
})
export class EnableDisableControlsDirective implements AfterViewInit {

    parentElement: ElementRef;
    modelHeader: string;
    reset: string;

    constructor(
        private el: ElementRef,
        private _notificationService: NotificationService,
        private _logger: LoggerService,
    ) {
        this._logger.info('EnableDisableControls : constructor ');
        this.parentElement = this.el;
    }

    ngAfterViewInit() {
        this._logger.info('EnableDisableControls : ngAfterViewInit ');
        this._notificationService.disableUINotification.subscribe(() => {
            this.enableDisable(this.parentElement.nativeElement);
        });
    }

    private enableDisable(currentElement: any): void {
        this._logger.info('EnableDisableControls : enableDisable ');
    }
}
