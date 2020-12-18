
import { SharedDataService } from './shared-data.service';

xdescribe('Shared Data Service ', () => {
    let sharedDataService: SharedDataService;

    const loggerService = {
        info: (x) => {
        }
    };

    const authService = {
        isUserLoggedIn: (value: boolean = true) => {
            return value;
        }
    };

    const utilityService = {
        reload: () => {
            return {};
        }
    };

    const apiService = {
        get: (x) => {
            return {
                subscribe: (y) => { y(); },
            };

        }
    };

    beforeEach(() => {
        sharedDataService = new SharedDataService(loggerService as any, authService as any, utilityService as any, apiService as any);
    });

    it('Should check whether get() of Api service is called', () => {
        spyOn(apiService, 'get').and.callThrough();
        sharedDataService.populateCommonData();
        expect(apiService.get).toHaveBeenCalled();
    });

    it('Should check whether handleError() of error block is called', () => {
        spyOn(loggerService, 'info').and.callThrough();
        const error = { status : 404 , message : 'not found' };
        sharedDataService.handleError(error);
        expect(loggerService.info).toHaveBeenCalled();
    });
});



