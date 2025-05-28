import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient,
        @Inject('baseURL') private baseURL: string
    ) { }

    getReq(url: string) {
        return this.http.get(this.baseURL + url);
    }
    postReq(url: string, reqData: any): Observable<any> {
        return this.http.post(this.baseURL + url, reqData);
    }
    putReq(url: string, reqData: any): Observable<any> {
        return this.http.put(this.baseURL + url, reqData);
    }
    deleteReq(url: string, reqData: any): Observable<any> {
        return this.http.request<string>('delete', this.baseURL + url, { body: reqData });
    }
}
