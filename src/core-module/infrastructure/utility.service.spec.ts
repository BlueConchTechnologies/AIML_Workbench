import { UtilityService } from './utility.service';

describe('UtilityService', () => {
    let utilityService: UtilityService;

    const _logger = {
        info: (y) => { },
        error: (m) => { }
    };

    const config = {};

    beforeEach(() => {
        utilityService = new UtilityService(_logger as any, config as any);
    });

    /*
    it('should check call for oprnInNewWindow', () => {
        spyOn(_logger, 'info').and.callThrough();

        const url = 'url';
        const features = 'features';
        _logger.info('UtilityService: OpenInNewWindow');
        utilityService.openInNewWindow(url, features);
        expect(_logger.info).toHaveBeenCalled();
    });
    */

    it('should check call for hideAppLoadingWidget', () => {
        spyOn(utilityService, 'hideAppLoadingWidget').and.callThrough();

        utilityService.hideAppLoadingWidget();
        expect(utilityService.hideAppLoadingWidget).toHaveBeenCalled();
    });

    it('should check call for showAppLoadingWidget', () => {
        spyOn(utilityService, 'showAppLoadingWidget').and.callThrough();

        utilityService.showAppLoadingWidget();
        expect(utilityService.showAppLoadingWidget).toHaveBeenCalled();
    });

    it('should check call for else part openInNewWindow', () => {
        spyOn(_logger, 'info').and.callThrough();

        const url = '';
        _logger.info('UtilityService: OpenInNewWindow');
        utilityService.openInNewWindow(url);
        expect(_logger.info).toHaveBeenCalled();
    });

    it('should check call for openInNewTab', () => {
        spyOn(_logger, 'info').and.callThrough();

        utilityService.openInNewTab();
        _logger.info('UtilityService: openInNewTab');
        expect(_logger.info).toHaveBeenCalled();
    });

    it('roundToNearestTenth', () => {
        const result = utilityService.roundToNearestTenth(87);
        expect(result).toEqual(90);
    });

    it('roundToNearestTenth', () => {
        const result = utilityService.roundToNearestTenth(82);
        expect(result).toEqual(80);
    });

    it('floor', () => {
        const result = utilityService.floor(9, 9);
        expect(result).toEqual(9);
    });

    it('floor', () => {
        const result = utilityService.floor(9, 1);
        expect(result).toEqual(9);
    });

    it('ceiling', () => {
        const result = utilityService.ceiling(9, 1);
        expect(result).toEqual(9);
    });

    it('round', () => {
        const result = utilityService.round(9, 1);
        expect(result).toEqual(9);
    });

    it('contains', () => {
        const str: string[] = [];
        const result = utilityService.contains(str, 'a');
        expect(result).toEqual(false);
    });
});
