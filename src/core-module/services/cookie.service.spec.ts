import { CookieService } from './cookie.service';


describe('CookieService', () => {
    let _cookieservice: CookieService;
    // let environmentName: string;
    // let domain: string;

    const logger = {
        info: (y) => { }
    };

    const _cookie = {
        get: () => { },
        delete: () => { },
        check: () => { }
    };
    const config = {};

    beforeEach(() => {
        _cookieservice = new CookieService(logger as any, config as any, _cookie as any);
    });

    it('should check call for getCookie', () => {
        spyOn(_cookie, 'get').and.callThrough();

        _cookieservice.getCookie('cookie1');
        expect(_cookie.get).toHaveBeenCalled();
    });

    it('should check call for setCookie', () => {
        spyOn(_cookieservice, 'setCookie').and.callThrough();

        _cookieservice.setCookie('cookie2', 'name');
        expect(_cookieservice.setCookie).toHaveBeenCalled();
    });

    it('should check call for deleteCookie', () => {
        spyOn(_cookieservice, 'deleteCookie').and.callThrough();

        _cookieservice.deleteCookie('cookie3');
        expect(_cookieservice.deleteCookie).toHaveBeenCalled();
    });

    it('should check call for doesCookieExists', () => {
        spyOn(_cookie, 'check').and.callThrough();

        _cookieservice.doesCookieExists('cookie');
        expect(_cookie.check).toHaveBeenCalled();
    });
});
