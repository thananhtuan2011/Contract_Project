import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { CustomAdapter, CustomDateParserFormatter } from './../../../_metronic/core/utils/date-picker.utils';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { ThuChiService } from '../thuchi.service';
import * as moment from 'moment';
const EMPTY_CUSTOMER: any = {
  id: undefined,
  reasons: '',
  lastName: '',
  email: '',
  userName: '',
  gender: 'Female',
  status: 2,
  dob: undefined,
  endday: undefined,
  dateOfBbirth: '',
  end_day: '',
  type: 2
};

@Component({
  selector: 'app-add-plan-thu-chi',
  templateUrl: './add-plan-thu-chi.component.html',
  styleUrls: ['./add-plan-thu-chi.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AddPlanThuChiComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  selectedcode: any;

  selectedtype: any = "Phiếu thu";
  selectedpay: any = "Tiền mặt";
  selected_customer: any;
  customer: any;
  user: any;
  listCustomer: any[] = [];
  listAllThu: any[] = [];
  listStatus: any[] = [];
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private _thuchi_services: ThuChiService,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder, public modal: NgbActiveModal
  ) { this.user = JSON.parse(localStorage.getItem("user")); }

  getAllCollection_category() {
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
    this._thuchi_services.getAllCollection_category(body).subscribe(res => {
      this.listAllThu = res.data;

      this.cdr.detectChanges();
    })
  }

  getAllCustomers() {
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
    this._thuchi_services.getAllCustomers(body).subscribe(res => {
      this.listCustomer = res.data;
      console.log("listCustomer", this.listCustomer)
      this.cdr.detectChanges();
    })
  }
  ngOnInit(): void {
    this.getAllCollection_category()

    this.getAllCustomers();
    this.isLoading$ = this._thuchi_services.isLoading$;
    this.loadCustomer();
  }
  convertDate(dateString) {
    var p = dateString.split(/\D/g)
    return [p[1], p[2], p[0]].join("/")
  }
  loadCustomer() {
    if (!this.id) {
      this.customer = EMPTY_CUSTOMER;
      this.loadForm();
    } else {
      const sb = this._thuchi_services.GetPlanById_Thu(this.id).subscribe((customer: any) => {
        let itemdata =
        {
          reasons: customer.pay,
          id: customer.idplan_,
          // end_day: this.convertDate(customer.end_date),
          dateOfBbirth: this.convertDate(customer.pay_date),

        }

        // this.selectedcode = customer.contract_id
        this.selectedcode = customer.id_code
        this.selected_customer = customer.customer_id
        this.customer = itemdata;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      reasons: [this.customer.reasons, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      dob: [this.customer.dateOfBbirth, Validators.compose([Validators.nullValidator])],
    });
  }

  save() {
    this.prepareCustomer();
    if (this.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    let item =
    {
      pay: this.customer.reasons,
      pay_date: moment(this.customer.dob).format('YYYY/MM/DD HH:mm:ss') + "Z",

      customer_id: this.selected_customer,
      account_id: this.user.account_id,
      id_code: this.selectedcode,
      account_id_update: this.user.account_id,
      updatedAt: new Date()
    }
    this._thuchi_services.UpdatePlanThu(this.id, item).subscribe(res => {
      this.layoutUtilsService.showActionNotification(" Update Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      this.modal.close();
    })

  }

  create() {
    let item =
    {
      pay: this.customer.reasons,
      pay_date: moment(this.customer.dob).format('YYYY/MM/DD HH:mm:ss') + "Z",

      customer_id: this.selected_customer,
      account_id: this.user.account_id,
      id_code: this.selectedcode
    }

    const sbCreate = this._thuchi_services.addThu(item).pipe(
      tap(() => {
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.customer);
      }),
    ).subscribe((res: any) => this.customer = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareCustomer() {
    const formData = this.formGroup.value;
    this.customer.dob = new Date(formData.dob);
    this.customer.endday = new Date(formData.endday);
    this.customer.reasons = formData.reasons;
    this.customer.type = +formData.type;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
  onDepartmentSelection() {

    console.log("ffff", this.selectedtype)
  }

}
