import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormService } from './reactive-form.service';
import { IReactiveform } from './reactive-form.model';
import { NotificationService } from '@global';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  dropdownValues: {};
  registerForm: FormGroup;
  reactiveformModel: IReactiveform = {
    name: '',
    email: '',
    age: '',
    city: '',
    gender: '',
    sendNotification: ''
  };

  constructor(private fb: FormBuilder, private reactiveformservice: ReactiveFormService, private notificationService: NotificationService) {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$')]],
      age: [null, [Validators.required, Validators.pattern('^([1-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|120)$')]],
      city: [null, Validators.required],
      gender: [null],
      sendNotification: [null]
    });
  }

  ngOnInit() {
    this.getDropdownValues();
  }

  // Validation error message methods for input fields
  getUserNameErrorMessage() {
    return this.registerForm.controls.name.hasError('required') ? 'Name is required' :
      this.registerForm.controls.name.hasError('pattern') ? 'Please enter valid Name' : '';
  }

  getEmailErrorMessage() {
    return this.registerForm.controls.email.hasError('required') ? 'Email is required' :
      this.registerForm.controls.email.hasError('pattern') ?
        'Please enter valid Email' : '';
  }

  getAgeErrorMessage() {
    return this.registerForm.controls.age.hasError('required') ? 'Age is required' :
      this.registerForm.controls.age.hasError('pattern') ? 'Please enter valid value for Age' : '';
  }
  // End

  getDropdownValues() {
    this.reactiveformservice.getFormData().subscribe(formData => {
      this.dropdownValues = formData;
    });
  }

  onCancel() {

  }

  onSubmit(sampleForm) {
    this.notificationService.notifyAlertModalRequired('MESSAGES.Alert.message2');
    this.registerForm.reset();
    this.reactiveformModel.city = '';
  }

}
