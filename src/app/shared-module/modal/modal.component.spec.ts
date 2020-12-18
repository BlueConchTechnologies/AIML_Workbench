import { ModalComponent } from './modal.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '@global';
import { AppComponent } from 'app/app.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  const notificationService = NotificationService;

  const modalservice = {
    // Mock ModalService response
    open: x => {
      return {
        result: new Promise((resolve, reject) => {
          resolve('');
        })
      };
    }
  };

  beforeEach(() => {
    component = new ModalComponent(
      modalservice as any,
      notificationService as any
    );
  });
  it('should create ModalComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should check whether openAlertModal is called', () => {
    spyOn(component, 'openAlertModal').and.callThrough();
    component.openAlertModal();
    expect(component.openAlertModal).toHaveBeenCalled();
  });

  it('should check whether openConfirmModal is called', () => {
    spyOn(component, 'openConfirmModal').and.callThrough();
    component.openConfirmModal();
    expect(component.openConfirmModal).toHaveBeenCalled();
  });

  it('should check whether getDismissReason is called', () => {
    spyOn(component, 'getDismissReason').and.callThrough();
    component.getDismissReason('');
    expect(component.getDismissReason).toHaveBeenCalled();
  });

  // The value of ModalDismissReasons.ESC is 1
  it('should check whether the getDismissReason returns (by pressing ESC)', () => {
    const reason = 1;
    component.getDismissReason(reason);
    expect(component.eventMsg).toContain('by pressing ESC');
  });

  // The value of ModalDismissReasons.BACKDROP_CLICK is 0
  it('should check whether the getDismissReason returns (by clicking on a backdrop)', () => {
    const reason = 0;
    component.getDismissReason(reason);
    expect(component.eventMsg).toContain('by clicking on a backdrop');
  });

});
