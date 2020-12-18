import { ReactiveFormComponent } from './reactive-form.component';
import { FormBuilder, Validators } from '@angular/forms';


describe('Reactiveform component', () => {
  let comp: ReactiveFormComponent;
  const formBuilder = {
    group: () => {
      { }
    }
  };

  // Mock ReactiveformService response
  const reactiveformService = {
    getFormData: (x) => {
      return {
        subscribe: (y) => { y(); }
      };
    }
  };

  const storageService = {
    clearStorage: () => {
      { }
    }
  };

  const notificationService = {
    notifyAlertModalRequired : (message: any) => {
      {}
    }
  };

  beforeEach(async () => {

  });

  beforeEach(() => {
    comp = new ReactiveFormComponent(formBuilder as any, reactiveformService as any, notificationService as any);
    const fb = new FormBuilder();
    comp.registerForm =  fb.group({
      name: [null, Validators.required, Validators.pattern('[a-zA-Z ]+')],
      email: [null, Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$')],
      age: [null, Validators.required, Validators.pattern('^([1-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|120)$')],
      city: [null, Validators.required],
      gender: [null],
      sendNotification: [null]
    });
  });

  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });

  it('should check whether getDropdownValues() are called', () => {
    spyOn(comp, 'getDropdownValues').and.callThrough();
    comp.ngOnInit();
    comp.onCancel();
    expect(comp.getDropdownValues).toHaveBeenCalled();
  });

  it('should check notifyAlertModalRequired is called on submit click', () => {
    spyOn(notificationService, 'notifyAlertModalRequired').and.callThrough();
    comp.onSubmit('');
    expect(notificationService.notifyAlertModalRequired).toHaveBeenCalled();
  });

  it('should check empty UserName value', () => {
   const nameStr = comp.getUserNameErrorMessage();
   expect(nameStr).toBe('Name is required');
  });

  it('should check empty Email value', () => {
    const mailStr = comp.getEmailErrorMessage();
    expect(mailStr).toBe('Email is required');
   });

   it('should check empty age value', () => {
    const ageStr = comp.getAgeErrorMessage();
    expect(ageStr).toBe('Age is required');
   });
});

