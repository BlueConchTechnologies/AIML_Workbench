import {
    Component
    , OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddToCartActions } from '@shared/state-management/store/action/cart.actions';
import { Cart } from '@shared/state-management/store/model/cart.model';


@Component({
    selector: 'sender',
    templateUrl: 'sender.component.html',
    styleUrls: ['sender.component.css']
})
export class SenderComponent implements OnInit {

    fname: string;
    constructor(private store: Store<Cart>) {
    }

    ngOnInit() {
    }

    onAddToCardClick(sampleForm: NgForm) {
        this.store.dispatch(new AddToCartActions(sampleForm.value.fname));
    }

}
