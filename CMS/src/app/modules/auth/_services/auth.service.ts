import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
const DOMAIN = environment.DOMAIN_COOKIES;
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;


  // get currentUserValue(): UserModel {
  //   return this.currentUserSubject.value;
  // }

  // set currentUserValue(user: any) {
  //   this.currentUserSubject.next(user);
  // }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
    setInterval(() => {
      const refreshToken = this.cookieService.get('refreshToken');
      this.refresh_token(refreshToken).subscribe()
    }, 300000);


    // let item = {
    //   fullname: "admin",
    //   firstname: "admin",
    //   lastname: "tt",
    //   email: "admin"
    // }
    // this.currentUserSubject = new BehaviorSubject<any>(item);
  }
  getHttpHeaders() {
    const token = this.cookieService.get("accessToken")

    // console.log('auth.token',auth.access_token)
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }

  getAccessToken_cookie() {

    const access_token = this.cookieService.get("accessToken");
    return access_token;
  }
  loginsso(item: any) {
    const httpHeaders = this.getHttpHeaders();
    const url = environment.apiUrl + `/api/acount/login`;
    return this.http.post<any>(url, item, {
    });
  }
  _refreshToken(item: any) {
    const httpHeaders = this.getHttpHeaders();
    const url = environment.apiUrl + `/refresh-token`;
    return this.http.post<any>(url, item, {
    });
  }
  inforuser() {
    const httpHeaders = this.getHttpHeaders();
    const url = environment.apiUrl + `/api/acount/GetInforUser`;
    return this.http.get<any>(url, {
      headers: httpHeaders
    });
  }
  // public methods
  login(username: string, password: string): Observable<UserModel> {
    let item = {
      username: username,
      password: password
    }

    this.isLoadingSubject.next(true);
    return this.loginsso(item).pipe(
      map((auth: AuthModel) => {
        if (!auth) {
          return of(undefined);
        }
        else {

          if (auth.accessToken) this.cookieService.set("accessToken", auth.accessToken, 365, '/', DOMAIN);
          if (auth.refreshToken) this.cookieService.set("refreshToken", auth.refreshToken, 365, '/', DOMAIN);
          // const result = this.setAuthFromLocalStorage(auth);
          return auth;
        }

      }),
      catchError((err) => {
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  refresh_token(refreshToken: string): Observable<UserModel> {
    let item = {
      refreshToken: refreshToken,
    }

    this.isLoadingSubject.next(true);
    return this._refreshToken(item).pipe(
      map((auth: any) => {
        if (!auth) {
          return of(undefined);
        }
        else {

          console.log("authauthauth", auth)

          if (auth.accessToken) this.cookieService.set("accessToken", auth.accessToken, 365, '/', DOMAIN);
          // const result = this.setAuthFromLocalStorage(auth);
          return auth;
        }

      }),
      catchError((err) => {
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteAccessRefreshToken_cookie() {
    this.cookieService.delete("accessToken", '/', DOMAIN);
    this.cookieService.delete("refreshToken", '/', DOMAIN);
  }

  logout() {
    this.deleteAccessRefreshToken_cookie();
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  isAuthenticated(): boolean {
    const access_token = this.cookieService.get("accessToken")
    const refresh_token = this.cookieService.get("refreshToken")
    if (access_token) {
      if (this.isTokenExpired(access_token)) {
        return true;
      }
    }
    // if (refresh_token) {
    //   if (this.isTokenExpired(refresh_token)) {
    //     return true;
    //   }
    // }
    return false;
  }

  getTokenExpirationDate(auth: string): Date {
    let decoded: any = jwt_decode(auth);
    if (!decoded.exp) {
      return null;
    }
    else {

      if (decoded.exp < Date.now() / 1000) {
        return null;
      }
      // if (Date.now() >= decoded.exp * 1000) {
      //   return null;
      // }
      else {
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
      }
    }
    // const date = new Date(0);
    // date.setUTCSeconds(decoded.exp);
    // return date;
  }
  isTokenExpired(token: string): boolean {
    const date = this.getTokenExpirationDate(token);
    if (!date) return false;
    return date.valueOf() > new Date().valueOf();
  }
  getUserByToken(): Observable<UserModel> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.accessToken).pipe(
      map((user: UserModel) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
