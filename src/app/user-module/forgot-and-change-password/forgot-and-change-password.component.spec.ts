import { ForgotAndChangePasswordComponent } from './forgot-and-change-password.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

describe('ForgotAndChangePasswordComponent', () => {
  let component: ForgotAndChangePasswordComponent;

  const formBuilder = {
    group: () => {
      { }
    }
  };

  const formdetails = new FormGroup({
    newpassword: new FormControl('saas'),
    confirmpassword: new FormControl('saas')
  });
  const toastService = {
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
  const router = {
    navigate: () => {
      return {};
    }
  };
  const response = {
    message: 'OK'
  };

  const loginservice = {
    setPassword(password: any): Observable<any> {
      return Observable.of(response);
    },

  };

  beforeEach(() => {
    // Initializes ForgotAndChangePassword Component by injecting required services
    component = new ForgotAndChangePasswordComponent(toastService as any, formBuilder as any, loginservice as any, router as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check whether onSubmit() is called', () => {
    // Checks for onSubmit method
    expect(component.formCheck).toBeFalsy();

    spyOn(toastService, 'showSuccess').and.callThrough();
    spyOn(toastService, 'showError').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    spyOn(loginservice, 'setPassword').and.callThrough();

    component.onSubmit(formdetails);
    component.formCheck = true;
    expect(loginservice.setPassword).toHaveBeenCalled();
    expect(toastService.showSuccess).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalled();

  });

  it('should check whether ngOnInit() is called', () => {
    component.ngOnInit();
  });
});
