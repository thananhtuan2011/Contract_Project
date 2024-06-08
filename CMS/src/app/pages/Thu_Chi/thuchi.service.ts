import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TableService } from 'src/app/_metronic/shared/crud-table';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThuChiService extends TableService<any> {
    baseUrl = environment.apiUrl + '/api';
    public Bieudo = new Subject<any>();
    public Bieudo_chi = new Subject<any>();
    public Bieudo_real = new Subject<any>();
    public Bieudo_chi_real = new Subject<any>();
    public FullDate = new Subject<any>();
    public sosanh_thu = new Subject<any>();
    public sosanh_chi = new Subject<any>();
    constructor(@Inject(CookieService) cookie_servics, @Inject(HttpClient) http,) {
        super(http, cookie_servics);
    }
    getFullDate(): Observable<any[]> {
        const events = [];
        let body = {
            "filter": {

            },
            "paginator": {
                "total": 0,
                "totalpage": 0,
                "page": 1,
                "pageSize": 10000,
                "pageSizes": [
                    0
                ]
            },

            "sorting": {

            }
        }
        this.getAllThu(body).subscribe(res => {
            res.data.forEach(element => {
                let item = {
                    title: element.id_code,
                    start: element.createdAt,
                }
                events.push(item)


            });
        })
        console.log("vvvvv", events)
        return of(events);
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
    UploadFile(body: any): Observable<any> {
        const url = this.baseUrl + '/UploadFile';
        const httpHeader = this.getHttpHeadersFile();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    getAllThuChi(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAllThuChi';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    // load thu thực tế
    getAllBill(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAllBill';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    // load chi thực tế
    getAllPayments(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAllPayments';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }



    getAllThu(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAllThu';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    getAllChi(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAllChi';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }

    getAllCollection_category(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAllCollection_category';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }


    GetAllReviewer(): Observable<any> {
        const url = this.baseUrl + '/acounts/GetAllReviewer';
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }
    deletePlan(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deletePlan/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }
    deletePlanThu(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deletePlanThu/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }
    deletePlanChi(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deletePlanChi/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }
    deleteDM_Thu(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deleteDM_Thu/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }
    deleteDM_Chi(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deleteDM_Chi/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }

    deletePay(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deletePay/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }
    GetPlanById(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetPlanById/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }
    GetPlanById_Chi(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetPlanById_Chi/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }
    GetPlanById_Thu(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetPlanById_Thu/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }
    GetRealityThuById(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetRealityThuById/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }
    GetRealityChiById(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetRealityChiById/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }



    Getdebt_billsById(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/Getpayments/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }

    GetDebtById(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetDebtById/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }

    UpdateDebt_invoice(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/UpdateDebt_invoice/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    UpdatePlan(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/UpdatePlan/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    Update_DM_Thu(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/Update_DM_Thu/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    UpdateDM_Chi(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/UpdateDM_Chi/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }

    UpdatePlanChi(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/UpdatePlanChi/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    UpdateDuyet(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/UpdateDuyet/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }

    UpdatePlanThu(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/UpdatePlanThu/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }

    UpdateChi(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/UpdateChi/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    UpdateThu(id: any, body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/UpdateThu/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }

    deleteThu(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deleteThu/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }
    deletDebt(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deletDebt/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }

    deletBebt(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/deletBebt/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, null, { headers: httpHeader });

    }
    getAllCustomerByid(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAllCustomerByid/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }
    getContractsById(id: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getContractsById/' + id;
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }

    getAlldebt_bills(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAlldebt_bills';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }


    getAllCustomers(body: any): Observable<any> {
        const url = this.baseUrl + '/cus/getallcustomer';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }


    getAllCollection_Chi(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/getAllCollection_Chi';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    getAllContracts(body: any): Observable<any> {
        const url = this.baseUrl + '/ctr/getAllContracts';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    addDM_Chi(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/addDM_Chi';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    GetChartPlanChi(body: any, year): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetChartPlanChi/' + year;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    GetChartPlanThu(body: any, year: number): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetChartPlanThu/' + year;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    GetChartPlanChi_ThucTe(body: any, year): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetChartPlanChi_ThucTe/' + year;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    GetChartPlanThu_ThucTe(body: any, year): Observable<any> {
        const url = this.baseUrl + '/thuchi/GetChartPlanThu_ThucTe/' + year;
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    addDM_Thu(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/addDM_Thu';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    addThuChi(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/addThuChi';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    addThu(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/addThuPlan';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    addChiPlan(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/addChiPlan';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }

    addDebt(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/addDebt';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }


    addBills(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/addBills';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    addPay(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/addPays';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }
    adddebts(body: any): Observable<any> {
        const url = this.baseUrl + '/thuchi/adddebts';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });

    }









    getAllSuppliers(body): Observable<any> {
        const url = this.baseUrl + '/ncc/getAllSuppliers';
        const httpHeader = this.getHttpHeaders();
        return this.http.post<any>(url, body, { headers: httpHeader });


    }

    GetAllStatus(): Observable<any> {
        const url = this.baseUrl + '/ctr/GetAllStatus';
        const httpHeader = this.getHttpHeaders();
        return this.http.get<any>(url, { headers: httpHeader });

    }

}
