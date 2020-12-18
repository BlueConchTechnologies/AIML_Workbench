
import { Observable } from 'rxjs';
import { APIService } from './api.service';


describe('Api Service ', () => {
    let apiService: APIService;

    const mockResponse = {
        sessionId: '1223',
        userName: 'abc',
        userId: 1,
        firstName: 'xyz',
        lastName: 'pqr',
        entityName: 'entity',
        entityId: 1,
        role: 1
    };

    const httpClient = {
        get(x: any): Observable<any> {
            return Observable.of(mockResponse);
        },
        post(x: any, data: object): Observable<any> {
            return Observable.of(mockResponse);
        },
        put(x: any, data: object): Observable<any> {
            return Observable.of(mockResponse);
        },
        delete(x: any): Observable<any> {
            return Observable.of(mockResponse);
        },
    };

    beforeEach(() => {
        apiService = new APIService(httpClient as any);

    });

    it('Should check whether get method of httpclient is called', () => {
        spyOn(httpClient, 'get').and.callThrough();
        apiService.get('');
        expect(httpClient.get).toHaveBeenCalled();
    });

    it('Should check whether post method of httpclient is called', () => {
        spyOn(httpClient, 'post').and.callThrough();
        apiService.post('', '');
        expect(httpClient.post).toHaveBeenCalled();
    });

    it('Should check whether put method of httpclient is called', () => {
        spyOn(httpClient, 'put').and.callThrough();
        apiService.put('', '');
        expect(httpClient.put).toHaveBeenCalled();
    });

    it('Should check whether delete method of httpclient is called', () => {
        spyOn(httpClient, 'delete').and.callThrough();
        apiService.delete('');
        expect(httpClient.delete).toHaveBeenCalled();
    });
});



