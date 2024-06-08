import { TableService } from 'src/app/_metronic/shared/crud-table';
import { environment } from './../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomerService extends TableService<any>{
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
  getHttpHeadersFile() {

    const token = this.cookie_servics.get("accessToken")

    // console.log('auth.token',auth.access_token)
    let result = new HttpHeaders({
      'x-access-token': token,
      'Access-Control-Allow-Origin': '*',
    });
    return result;
  }
  getHttpFile() {

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
  getAllSupplier(body: any): Observable<any> {
    const url = this.baseUrl + '/ncc/getAllSuppliers';
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }
  getAllLevel(): Observable<any> {
    const url = this.baseUrl + '/cus/getAllLevel';
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });

  }

  ImportData(body): Observable<any> {
    console.log("body", body)
    const url = this.baseUrl + '/cus/ImportData';
    const httpHeader = this.getHttpHeadersFile();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }


  getAllTypeCustomer(): Observable<any> {
    const url = this.baseUrl + '/cus/getAllTypeCustomer';
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });

  }

  deleteCustomer(id: any): Observable<any> {
    const url = this.baseUrl + '/cus/deleteCustomer/' + id;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, null, { headers: httpHeader });

  }


  updateCustomers(id: any, body: any): Observable<any> {
    const url = this.baseUrl + '/cus/updateCustomers/' + id;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }

  addCustomers(body: any): Observable<any> {
    const url = this.baseUrl + '/cus/addCustomers';
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }
}
