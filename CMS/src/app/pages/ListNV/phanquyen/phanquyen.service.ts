import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TableService } from 'src/app/_metronic/shared/crud-table';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhanquyenService extends TableService<any>{
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

  getPermissNotInGroup(id: any): Observable<any> {
    const url = this.baseUrl + `/permiss/getPermissNotInGroup/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });

  }
  getPermiss(id: any): Observable<any> {
    const url = this.baseUrl + `/permiss/getPermiss/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });

  }
  getPermissAll() {
    const url = this.baseUrl + `/permiss/getPermissAll`;
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });
  }
  getPermissBy() {
    const url = this.baseUrl + `/permiss/getPermissAll`;
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });
  }
  addGroupRolesWithPermiss(body: any): Observable<any> {
    const url = this.baseUrl + `/permiss_user/addGroupRolesWithPermiss`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });
  }

  updateRolesPermis(body: any): Observable<any> {
    const url = this.baseUrl + `/permiss_user/updateRolesPermis`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });
  }
  GetGroupPermiss(): Observable<any> {
    const url = this.baseUrl + `/permiss_user/GetGroupPermiss`;
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });

  }
  GetGroupsRoles(): Observable<any> {
    const url = this.baseUrl + `/permiss_user/GetGroupPermiss`;
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });

  }
  GetGroupRoleUser(id: any): Observable<any> {
    const url = this.baseUrl + `/permiss_user/GetGroupRoleUser/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(url, { headers: httpHeader });

  }

  addGroupAcountRoles(body: any): Observable<any> {
    const url = this.baseUrl + `/permiss_user/addGroupAcountRoles/`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }

  DeleteGroupRoles(id: any): Observable<any> {
    const url = this.baseUrl + `/permiss_user/DeleteGroupRoles/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, null, { headers: httpHeader });

  }

  DeleteGroup(id: any): Observable<any> {
    const url = this.baseUrl + `/permiss_user/DeleteGroup/${id}`;
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, null, { headers: httpHeader });

  }

}
