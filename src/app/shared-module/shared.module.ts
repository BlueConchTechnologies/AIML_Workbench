import { NgModule } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// plugins
import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {
    RestrictInputDirective,
    EnableDisableControlsDirective
} from './directive/index';

import {
    LogoutComponent,
    HeaderComponent
} from './header/index';

import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';


import {
    DatexPipe,
    EllipsisPipe,
    SafeHtmlPipe,
    SplitPipe
} from './pipes/index';
import { LoginComponent } from 'app/user-module/login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { SpinnerService } from '@core';

declare var resourcesVersion: any;

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + resourcesVersion);
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        DialogModule,
        ToastModule,
        NgbCarouselModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        NgbModule
    ],
    declarations: [
        // pipes
        DatexPipe,
        EllipsisPipe,
        SafeHtmlPipe,
        SplitPipe,

        // directives
        RestrictInputDirective,
        EnableDisableControlsDirective,

        // components
        SpinnerComponent,
        HeaderComponent,
        LogoutComponent,
        FooterComponent,
        LoginComponent,
        ModalComponent,
        LeftPanelComponent,
        FooterComponent

    ],
    providers: [ SpinnerService
    ],
    exports: [
        // Angular modules
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,

        // plugins
        DialogModule,
        ToastModule,
        NgbCarouselModule,
        TranslateModule,

        // pipes
        DatexPipe,
        EllipsisPipe,
        SafeHtmlPipe,
        SplitPipe,

        // directives
        RestrictInputDirective,
        EnableDisableControlsDirective,

        // shared components
        SpinnerComponent,
        HeaderComponent,
        LogoutComponent,
        FooterComponent,
        LoginComponent,
        LeftPanelComponent,
        ModalComponent,
        FooterComponent
    ]
})

export class SharedModule {
}
