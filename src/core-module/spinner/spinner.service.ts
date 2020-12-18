import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/share';

@Injectable()
export class SpinnerService {
  public status: Subject<boolean> = new Subject<boolean>();
  private _active = false;

  public get active(): boolean {
    return this._active;
  }

  public set active(v: boolean) {
    this._active = v;
    this.status.next(v);
  }

  public start() {
    return this.active = true;
  }

  public stop()  {
    return this.active = false;
  }

  fakeAPICall() {
    const promise = new Promise(((resolve, reject) => {
      setTimeout(() => {
        resolve({
          status: true,
        });
      }, 3000);
    }));
    return promise;
  }
}
