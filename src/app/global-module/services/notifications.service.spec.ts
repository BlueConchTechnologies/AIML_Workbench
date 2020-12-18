
import { NotificationService } from './notifications.service';
import { Subject } from 'rxjs';


describe('Notification Service ', () => {
    let notificationService: NotificationService;

    // Mock info method of logger service
    const loggerService = {
        info: (x) => { }
    };

    const mockProductAddedToCartSubject = new Subject<null>();
    const productSub = {
        mockSubjectObj: mockProductAddedToCartSubject,
    };

    const mockDisableUISubject = new Subject<null>();
    const disableUISub = {
        mockSubjectObj: mockDisableUISubject,
    };

    const mockAlertModalSubject = new Subject<string>();
    const alertModalSub = {
        mockSubjectObj: mockAlertModalSubject,
    };

    const mockConfirmModalSubject = new Subject<string>();
    const confirmModal = {
        mockSubjectObj: mockConfirmModalSubject,
    };


    beforeEach(() => {
        notificationService = new NotificationService(loggerService as any);
        notificationService.productAddedToCartNotification = productSub.mockSubjectObj;
        notificationService.disableUINotification = disableUISub.mockSubjectObj;
        notificationService.alertModalRequired = alertModalSub.mockSubjectObj;
        notificationService.confirmModalRequired = confirmModal.mockSubjectObj;
    });

    it('Should check whether info and next of ProductAddedToCart subject is called', () => {
        spyOn(loggerService, 'info').and.callThrough();
        spyOn(notificationService.productAddedToCartNotification, 'next').and.callThrough();
        notificationService.notifyProductAddedToCart();
        expect(loggerService.info).toHaveBeenCalled();
        expect(notificationService.productAddedToCartNotification.next).toHaveBeenCalled();
    });

    it('Should check whether info and next of disableUINotification subject is called', () => {
        spyOn(loggerService, 'info').and.callThrough();
        spyOn(notificationService.disableUINotification, 'next').and.callThrough();
        notificationService.notifyDisableUI();
        expect(loggerService.info).toHaveBeenCalled();
        expect(notificationService.disableUINotification.next).toHaveBeenCalled();
    });

    it('Should check whether info and next of disableUINotification subject is called', () => {
        spyOn(loggerService, 'info').and.callThrough();
        spyOn(notificationService.alertModalRequired, 'next').and.callThrough();
        notificationService.notifyAlertModalRequired('abc');
        expect(loggerService.info).toHaveBeenCalled();
        expect(notificationService.alertModalRequired.next).toHaveBeenCalled();
    });

    it('Should check whether info and next of confirmModalRequired subject is called', () => {
        spyOn(loggerService, 'info').and.callThrough();
        spyOn(notificationService.confirmModalRequired, 'next').and.callThrough();
        notificationService.notifyConfirmModalRequired('abc');
        expect(loggerService.info).toHaveBeenCalled();
        expect(notificationService.confirmModalRequired.next).toHaveBeenCalled();
    });
});



