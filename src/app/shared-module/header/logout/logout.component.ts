import {
    Component,
    ViewChild,
    Output,
    EventEmitter,
    ElementRef
} from '@angular/core';

import { LoggerService } from '@core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'logout',
    templateUrl: 'logout.component.html'
})
export class LogoutComponent {

    @Output() logoutConfirmation = new EventEmitter<boolean>();
    @ViewChild('contentLogoutModal') contentLogoutModal: ElementRef;

    constructor(
        private _logger: LoggerService,
        private modalService: NgbModal,
    ) {
        this._logger.info('LogoutComponent : constructor ');
    }

    showConfirmationModal() {
        this._logger.info('LogoutComponent : showConfirmationModal ');
        this.modalService.open(this.contentLogoutModal, { ariaLabelledBy: 'modal-basic-title' });
    }

    closeConfirmationModal() {
        this._logger.info('LogoutComponent : closeConfirmationModal ');
        this.logoutConfirmation.emit(true);
    }
}
