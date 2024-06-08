

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TableService } from 'src/app/_metronic/shared/crud-table';

@Injectable({
  providedIn: 'root'
})
export class PhongbanService extends TableService<any>{
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
  addDepartment(body: any): Observable<any> {
    const url = this.baseUrl + '/depart/addDepartment';
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }
  getAllDepartment(body: any): Observable<any> {
    const url = this.baseUrl + '/depart/getAllDepartment';
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }
  deleteDepartment(id: any): Observable<any> {
    const url = this.baseUrl + `/depart/deleteDepartment/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, null, { headers: httpHeader });

  }
  updateDepartment(id: any, body: any): Observable<any> {
    const url = this.baseUrl + `/depart/updateDepartment/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }


}
