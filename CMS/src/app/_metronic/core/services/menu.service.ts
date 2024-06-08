import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class MenuServices {
	data_share$ = new BehaviorSubject<any>([]);

	ReadOnlyControl: boolean;
	constructor(private http: HttpClient, private cookie_services: CookieService
	) { }


	getHTTPHeaders(): HttpHeaders {
		const access_token = this.cookie_services.get("accessToken");
		let result = new HttpHeaders({
			'Content-Type': 'application/json',
			"x-access-token": ` ${access_token}`,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'TimeZone': (new Date()).getTimezoneOffset().toString()
		});
		return result;
	}
	layMenuChucNang(): Observable<any> {
		const httpHeaders = this.getHTTPHeaders();
		return this.http.get<any>(environment.apiUrl + `/api/menu/getmenu`, { headers: httpHeaders });
	}


}
