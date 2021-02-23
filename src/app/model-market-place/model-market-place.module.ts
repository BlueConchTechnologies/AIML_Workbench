import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { routing } from './model-market-place.routing';
import { SharedModule } from '@shared/shared.module';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MarketPlaceComponent],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ModelMarketPlaceModule { }
