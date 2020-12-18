import { Component, OnInit } from '@angular/core';
import { ToastrService } from '@core/services';
import { ToastrCode } from '@core';

@Component({
  selector: 'app-toastr-demo',
  templateUrl: './toastr-demo.component.html',
  styleUrls: ['./toastr-demo.component.css']
})
export class ToastrDemoComponent implements OnInit {

  constructor(private toastService: ToastrService) { }

  onShow() {
    this.toastService.showSuccess(ToastrCode.EmailSent);
  }

  showError() {
    this.toastService.showError(ToastrCode.InvalidLink);
  }

  ngOnInit() {
  }
}
