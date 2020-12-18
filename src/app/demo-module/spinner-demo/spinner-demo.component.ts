import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@core';



@Component({
  selector: 'app-spinner-demo',
  templateUrl: './spinner-demo.component.html',
  styleUrls: ['./spinner-demo.component.css']
})
export class SpinnerDemoComponent implements OnInit {

  constructor(private spinservice: SpinnerService) { }

  public spinneractive = false;
  public active = false;

  onClick() {
    // show spinner on click
    this.spinservice.start();
    this.spinservice.fakeAPICall().then(respo => {
      if (respo) {
        this.spinservice.stop();
      }
    });
  }

  ngOnInit() {
  }

}
