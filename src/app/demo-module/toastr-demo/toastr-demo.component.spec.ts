import { ToastrDemoComponent } from './toastr-demo.component';
import { ToastrService } from '@core';

describe('ToastrDemoComponent', () => {
  let component: ToastrDemoComponent;
  const toastService = {
    showSuccess: (x) => {
      { }
    },
    showError: (y) => {
      { }
    }
  };

  beforeEach(() => {
    component = new ToastrDemoComponent(toastService as ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check whether onShow gets called', () => {
    spyOn(component, 'onShow').and.callThrough();

    component.onShow();
    expect(component.onShow).toHaveBeenCalled();
  });

  it('should check whether showError gets called', () => {
    spyOn(component, 'showError').and.callThrough();

    component.showError();
    expect(component.showError).toHaveBeenCalled();
  });
});
