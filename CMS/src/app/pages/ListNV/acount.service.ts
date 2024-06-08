import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { QueryParamsModelNewLazy, QueryResultsModel } from './model/pagram';
import { Observable } from 'rxjs';
import { TableService } from 'src/app/_metronic/shared/crud-table';

@Injectable({
  providedIn: 'root'
})
export class AcountService extends TableService<any>{
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
  addAcount(body: any): Observable<any> {
    const url = this.baseUrl + '/acounts/addAcount';
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }
  updateAcountRoleDeparment(body: any, id: any): Observable<any> {
    const url = this.baseUrl + `/acounts/updateAcountRoleDeparment/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }

  deleteAccount(id: any): Observable<any> {
    const url = this.baseUrl + `/acounts/deleteAccount/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, null, { headers: httpHeader });

  }
  updateAcount(body: any, id: any): Observable<any> {
    const url = this.baseUrl + `/acounts/updateAcount/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }

}
