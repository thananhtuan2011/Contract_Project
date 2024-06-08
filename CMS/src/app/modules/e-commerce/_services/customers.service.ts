import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableService } from '../../../_metronic/shared/crud-table';
import { Customer } from '../_models/customer.model';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends TableService<Customer> implements OnDestroy {
  API_URL = `${environment.apiUrl}/customers`;
  constructor(@Inject(CookieService) cookie_servics, @Inject(HttpClient) http,) {
    super(http, cookie_servics);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
