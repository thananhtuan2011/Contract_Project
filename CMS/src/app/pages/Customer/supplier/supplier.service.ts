import { environment } from './../../../../environments/environment';
import { TableService } from 'src/app/_metronic/shared/crud-table';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SupplierService extends TableService<any>{
    baseUrl = environment.apiUrl + '/api';
    constructor(@Inject(CookieService) cookie_servics, @Inject(HttpClient) http,) {
        super(http, cookie_servics);
    }

    getHttpHeaders() {

        const token = this.cookie_servics.get("accessToken")

        // console.log('auth.token',auth.access_token)
        let result = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        return result;
    }
    getDSAcount(body: any): Observable<any> {
        const url = this.baseUrl + '/acounts/getallacount';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    deleteSup(id: any): Observable<any> {
        const url = this.baseUrl + '/ncc/deleteSuppliers/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }
    getAllLevel(): Observable<any> {
        const url = this.baseUrl + '/cus/getAllLevel';
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }
    getAlltype_suppliers(): Observable<any> {
        const url = this.baseUrl + '/ncc/getAlltype_suppliers';
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }

    updateSuppliers(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/ncc/updateSuppliers/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }

    addSupp(body: any): Observable<any> {
        const url = this.baseUrl + '/ncc/addSuppliers';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
}
