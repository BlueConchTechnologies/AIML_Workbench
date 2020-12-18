import {
    NgModule,
    ErrorHandler,
    ModuleWithProviders,
    SkipSelf,
    Optional
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoggerModule } from 'ngx-logger';
import { CookieService } from 'ngx-cookie-service';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import {
    LoggingErrorHandlerOptions,
    GlobalErrorHandlerService,
    GlobalErrorLoggingService,
    GlobalErrorDialogComponent
} from './errorHandling/index';

import { AuthService } from './extensions/index';

import {
    ConfigurationSettings,
    EnvironmentConfig,
    UtilityService,
    ValidationService
} from './infrastructure/index';

import { LoggerService } from './services/logger.service';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SpinnerService } from './spinner/spinner.service';
import { ToastrService } from './services/toastr.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './interceptors/http-header.interceptor';
import { BrowserInfoService } from './services/browser-info.service';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LoggerModule,
        DialogModule,
        ToastModule
    ],
    declarations: [
        GlobalErrorDialogComponent,
        PageNotFoundComponent,
        UnauthorizeComponent
    ],
    exports: [
        GlobalErrorDialogComponent,
        PageNotFoundComponent
    ],
    providers: [
        BrowserInfoService,
        LoggerService,
        MessageService,
        ToastrService,
        CookieService,
        UtilityService,
        ValidationService,
        AuthService,
        SpinnerService,
        GlobalErrorLoggingService,
        {
            provide: LoggingErrorHandlerOptions,
            useValue: {
                isRethrowError: ConfigurationSettings.isRethrowErrorInsideGlobalErrorHandler,
                isUnwrapError: ConfigurationSettings.isUnwrapErrorInsideGlobalErrorHandler,
                isLogErrorToConsole: ConfigurationSettings.islogErrorToConsoleInsideGlobalErrorHandler,
                isSendErrorToServer: ConfigurationSettings.isSendErrorToServerInsideGlobalErrorHandler,
                isShowErrorDialog: ConfigurationSettings.isShowErrorDialogInsideGlobalErrorHandler
            }
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandlerService
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpHeaderInterceptor,
            multi: true
        },
    ]
})

export class CoreModule {

    // Prevent core module to be injected multiple times
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(config: EnvironmentConfig): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: EnvironmentConfig, useValue: config }
            ]
        };
    }

}
