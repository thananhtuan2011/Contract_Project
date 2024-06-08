import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { ThuChiService } from '../thuchi.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { catchError, tap } from 'rxjs/operators';
const EMPTY_CUSTOMER: any = {
  id: undefined,
  lastName: '',
  email: '',
  userName: '',
  total: undefined,
  gender: 'Female',
  status: 2,
  dob: undefined,
  endday: undefined,
  dateOfBbirth: '',
  end_day: '',
  type: 2
};
@Component({
  selector: 'app-cread-cong-no',
  templateUrl: './cread-cong-no.component.html',
  styleUrls: ['./cread-cong-no.component.scss']
})
export class CreadCongNoComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  tiencantra: number;
  amount: number;
  note: string;
  money: number;
  paymonth: number;
  selectedbills: any;
  listAllChi: any[] = []
  listAllCustomer: any[] = []
  start_date = new Date();

  end_date = new Date();
  files: File[] = [];
  selectedcode: any;
  selectedcontract: any;
  selectedcustomer: any;
  filename: string;
  selectedreview: any;
  selectedtype: any = "Phải thu";
  selectedtype_month: any;
  // selectedpay: any = "Tiền mặt";
  selectedplan: any;;
  customer: any;
  user: any;
  listAllThuChi: any[] = [];
  listStatus: any[] = [];
  listContract: any[] = [];
  listAlldebt_bill: any[] = [];
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private _thuchi_services: ThuChiService,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder, public modal: NgbActiveModal
  ) { this.user = JSON.parse(localStorage.getItem("user")); }

  // GetAllStatus() {
  //   this._hopdong_services.GetAllStatus().subscribe(res => {
  //     this.listStatus = res;
  //     this.cdr.detectChanges();
  //   })
  // }
  getAlllistAllChi() {
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
    this._thuchi_services.getAllCollection_Chi(body).subscribe(res => {
      this.listAllChi = res.data;
      console.log("listAllChi", this.listAllChi)
      this.cdr.detectChanges();
    })
  }
  getAllContracts() {
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
    this._thuchi_services.getAllContracts(body).subscribe(res => {
      this.listContract = res.data;
      console.log("listContract", this.listContract)
      this.cdr.detectChanges();
    })
  }


  getAllThuchi() {
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
    this._thuchi_services.getAllThuChi(body).subscribe(res => {
      this.listAllThuChi = res.data;

      this.cdr.detectChanges();
    })
  }
  listAllReviewer: any[] = [];
  GetAllReviewer() {
    this._thuchi_services.GetAllReviewer().subscribe(res => {
      this.listAllReviewer = res;
      console.log("listAllReviewer", this.listAllReviewer)
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
      this.listAllCustomer = res.data;
      console.log("listAllCustomer", this.listAllCustomer)
      this.cdr.detectChanges();
    })
  }
  getAlldebt_bills() {
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
    this._thuchi_services.getAlldebt_bills(body).subscribe(res => {
      this.listAlldebt_bill = res.data;
      console.log("listAlldebt_bill", this.listAlldebt_bill)
      this.cdr.detectChanges();
    })
  }
  phone: string;
  onSelection(val) {
    this._thuchi_services.getAllCustomerByid(val).subscribe(res => {
      this.phone = res.phone
      this.cdr.detectChanges();

    })
  }
  onSelectionContract(val) {
    this._thuchi_services.getContractsById(val).subscribe(res => {
      this.amount = res.value_contract
      this.cdr.detectChanges();

    })
  }
  onSelection_money(val) {

    this.tiencantra = this.amount - val
  }
  onSelection_type_month(val) {
    if (val == "3 tháng") {
      if (this.amount < this.paymonth) {
        this.paymonth = this.amount / 2
      }
      else {
        this.paymonth = 100000

      }
    }
    else if (val == "6 tháng") {

      if (this.amount < this.paymonth) {
        this.paymonth = this.amount / 2
      }
      else {
        this.paymonth = 300000

      }
    }
    else {
      if (this.amount < this.paymonth) {
        this.paymonth = this.amount / 2
      }
      else {
        this.paymonth = 500000


      }
    }

  }

  ngOnInit(): void {
    this.selectedplan = 2
    this.getAllCustomers();
    this.getAlldebt_bills();
    this.GetAllReviewer();
    this.getAllContracts();
    this.getAllThuchi()
    this.getAlllistAllChi();
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
      const sb = this._thuchi_services.GetPlanById(this.id).subscribe((customer: any) => {
        let itemdata =
        {
          // end_day: this.convertDate(customer.end_date),
          // dateOfBbirth: this.convertDate(customer.start_date),

        }
        this.selectedplan = customer.status_id
        this.selectedcode = customer.contract_id
        this.selectedtype = customer.type
        this.customer = itemdata;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      total: [this.customer.total, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      dob: [this.customer.dateOfBbirth, Validators.compose([Validators.nullValidator])],
      status: [this.customer.status, Validators.compose([Validators.required])],
      gender: [this.customer.gender, Validators.compose([Validators.required])],
      type: [this.customer.type, Validators.compose([Validators.required])]
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
      Total_amount: this.customer.total,
      type: this.selectedtype,
      Img: this.filename,
      Date_bill: moment(this.customer.dob).format('YYYY/MM/DD HH:mm:ss'),
      // end_date: moment(this.customer.endday).format('YYYY/MM/DD HH:mm:ss'),
      approved_by: this.selectedreview,
      account_id: this.user.account_id,
      idPlan: this.selectedcode,
      // contract_id: this.selectedcode
    }
    this._thuchi_services.UpdatePlan(this.id, item).subscribe(res => {
      this.layoutUtilsService.showActionNotification(" Update Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      this.modal.close();
    })

  }

  create() {
    let item =
    {
      type_pay: this.selectedtype,
      start_date: moment(this.start_date).format('YYYY/MM/DD HH:mm:ss'),
      end_date: moment(this.end_date).format('YYYY/MM/DD HH:mm:ss'),
      customer_id: Number.parseInt(this.selectedcustomer),
      account_id: this.user.account_id,
      month: this.selectedtype_month,
      amount: this.amount,
      pay_month: this.paymonth,
      Debt_pay: this.money,
      Debt_amount: this.tiencantra,
      contract_id: Number.parseInt(this.selectedcontract),
      idDebt_bills: Number.parseInt(this.selectedbills),
      Note: this.note,
      type: this.selectedtype
      // contract_id: this.selectedcode
    }

    console.log("vccccccc", item)
    const sbCreate = this._thuchi_services.adddebts(item).pipe(
      tap(() => {
        //  upload image nếu có 
        if (this.files) {
          this.onUpload();
        }
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
    // this.customer.endday = new Date(formData.endday);
    this.customer.total = formData.total;
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
  list_image: any[] = [];
  onSelectFile_PDF(event) {
    const files = event.target.files;
    var reader = new FileReader();
    let cat: any;
    var file_name = event.target.files;
    this.filename = file_name[0].name;
    if (files) {
      reader.onload = (event) => {
        this.list_image.push(event.target.result);
        console.log("list_image", this.list_image)
        this.cdr.detectChanges();




      }
      reader.readAsDataURL(event.target.files[0]);

      //  console.log('this.list_image_Edit',this.list_image_Edit)
      this.files = files;
    }

  }
  onUpload() {
    if (this.files.length) {
      const formData = new FormData();

      [...this.files].forEach((file) => {
        formData.append("files", file, file.name);
      });

      this._thuchi_services.UploadFile(formData).subscribe(res => {

      })


    }
  }
}
