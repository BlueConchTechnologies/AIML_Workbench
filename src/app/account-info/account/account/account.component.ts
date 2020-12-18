import { Component, OnInit } from '@angular/core';
import { Constants } from '@shared';
import { AccountDataService } from '@shared/services/account-data.service';
import { AccountInfoModel } from '@shared/infrastructure/accountinfo-model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { fileURLToPath } from 'url';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  myFieldlabels = Constants.accountfields;
  public accountdata: AccountInfoModel;
  isShowserverForm = '';
  form: FormGroup;

  switchForm(fieldType: string) {
    this.isShowserverForm = fieldType;
    this.form.reset();
    this.formUpdates(fieldType);
  }

  constructor(
    private accountinfoservice: AccountDataService,
    private formBuilder: FormBuilder
  ) {}

  private formUpdates(fieldType: string) {
    if (fieldType === 'trainingserver' || fieldType === 'databaseserver') {
      this.form.controls['accesskey'].setValidators(Validators.required);
      this.form.controls['secretkey'].setValidators(Validators.required);
      this.form.controls['miniohost'].setValidators(Validators.required);
      this.form.controls['bucketname'].setValidators(Validators.required);
    } else {
      this.form.controls['accesskey'].clearValidators();
      this.form.controls['secretkey'].clearValidators();
      this.form.controls['miniohost'].clearValidators();
      this.form.controls['bucketname'].clearValidators();
    }
    this.form.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      accesskey: [''],
      secretkey: [''],
      miniohost: [''],
      bucketname: [''],
    });
  }

  get formdata() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.accountinfoservice.saveData(this.form.value).subscribe(
        (successResponse) => {
          console.log('Data has been saved Successfully', successResponse);
          this.form.reset();
        },
        (errorResponse) => {
          console.log('ERROR', errorResponse);
        }
      );
    }
  }
}
