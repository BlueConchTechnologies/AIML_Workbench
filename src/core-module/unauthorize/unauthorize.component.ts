import { Component, OnInit } from '@angular/core';
import { LoggerService } from '@core/services';

@Component({
  selector: 'app-unauthorize',
  template: `
      <div class="row">
        <div class="col-md-4"></div>
          <div class="col-md-6 top">
            <h4>You are not authorized to this page</h4>
          </div>
      </div>
  `,
  styles: [
    `
      .top {
        margin-top: 60px;
        border-radius: 10px;
      }
    `
  ]
})
export class UnauthorizeComponent implements OnInit {

  constructor(
    private _logger: LoggerService
  ) {
    this._logger.info('UnauthorizeComponent : constructor ');
  }

  ngOnInit() {
  }


}
