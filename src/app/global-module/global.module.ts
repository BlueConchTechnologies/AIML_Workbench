import {
    NgModule,
    APP_INITIALIZER,
    ErrorHandler,
    ModuleWithProviders,
    SkipSelf,
    Optional
} from '@angular/core';

import {
    AuthGuardService,
    NotificationService,
    SharedData,
    SharedDataService
} from './services/index';
import { APIService } from './services/api.service';

export function sharedDataServiceFactory(service: SharedDataService) {
    return () => service.populateCommonData();
}

@NgModule({
    imports: [

    ],
    declarations: [
    ],
    providers: [
        AuthGuardService,
        SharedDataService,
        APIService,
        NotificationService,
        {
            provide: APP_INITIALIZER,
            useFactory: sharedDataServiceFactory,
            deps: [SharedDataService],
            multi: true
        }
    ],
    exports: [
    ]
})

export class GlobalModule {

    // Prevent global module to be injected multiple times
    constructor( @Optional() @SkipSelf() parentModule: GlobalModule) {
        if (parentModule) {
            throw new Error(
                'GlobalModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders<GlobalModule> {
        return {
            ngModule: GlobalModule,
            providers: [
            ]
        };
    }
}
