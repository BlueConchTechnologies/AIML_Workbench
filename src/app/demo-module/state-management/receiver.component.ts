import {
    Component
    , OnInit
} from '@angular/core';
import { Cart } from '@shared/state-management/store/model/cart.model';
import { Store, select } from '@ngrx/store';

@Component({
    selector: 'receiver',
    templateUrl: 'receiver.component.html'
})
export class ReceiverComponent implements OnInit {
    data: any;

    constructor(private store: Store<{ reducer: Cart }>) {
        this.store.pipe(select('reducer')).subscribe(values => {
            this.data = values;
        });
    }

    ngOnInit() {

    }

}
