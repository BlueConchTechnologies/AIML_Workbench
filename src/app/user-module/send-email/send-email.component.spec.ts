import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailComponent } from './send-email.component';
import { Observable } from 'rxjs';
import { ToastrService } from '@core';

describe('SendEmailComponent', () => {
  let component: SendEmailComponent;
  const resetToken = {
    message: 'OK'
  };
  const resetConfirm = {
    message: 'OK'
  };

  const utilityService = {
    openInNewTab: (x) => {}
  };

  const loginservice = {
    onForgotClick(): Observable<any> {
      return Observable.of(resetToken);
    },
    resetPassword(token: string): Observable<any> {
      return Observable.of(resetConfirm);
    }
  };

  const toastrService = {
    showSuccess: (x) => {
      return {
        subscribe: (y) => { y(); }
      };
    },
    showError: (x) => {
      return {
        subscribe: (y) => { y(); }
      };
    }
  };
  beforeEach(() => {
    // Initializes SendEmailComponent Component by injecting required services
    component = new SendEmailComponent(loginservice as any, toastrService as any, utilityService as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check onSubmit gets called for if condition', () => {
    spyOn(toastrService, 'showError').and.callThrough();

    component.onSubmit();
    component.emailvalue = '';
    toastrService.showError('empty field');
    expect(toastrService.showError).toHaveBeenCalled();

  });

  it('should check onSubmit for else condition', () => {
    spyOn(loginservice, 'onForgotClick').and.callThrough();
    spyOn(toastrService, 'showSuccess').and.callThrough();
    component.emailvalue = 'sas';
    component.onSubmit();
    expect(loginservice.onForgotClick).toHaveBeenCalled();
    component.tokenvalue = 'asas';
    toastrService.showSuccess('');
    expect(toastrService.showSuccess).toHaveBeenCalled();
  });

  it('should check showLink gets called', () => {
    spyOn(component, 'showLinK').and.callThrough();

    component.showLinK();
    expect(component.showLinK).toHaveBeenCalled();
  });


  it('should check for gotoForgotPassword call', () => {
    spyOn(loginservice, 'resetPassword').and.callThrough();
    spyOn(toastrService, 'showError').and.callThrough();

    component.tokenvalue = 'token';
    component.gotoForgotPassword();
    loginservice.resetPassword('token');
    component.resetConfirm = 'OK';
    toastrService.showError('Invalid User');
    expect(loginservice.resetPassword).toHaveBeenCalled();
    expect(toastrService.showError).toHaveBeenCalled();
  });
});
