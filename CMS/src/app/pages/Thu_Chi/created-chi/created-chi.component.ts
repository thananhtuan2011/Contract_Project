import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { ThuChiService } from '../thuchi.service';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CustomAdapter, CustomDateParserFormatter } from './../../../_metronic/core/utils/date-picker.utils';
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
  selector: 'app-created-chi',
  templateUrl: './created-chi.component.html',
  styleUrls: ['./created-chi.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class CreatedChiComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading$;
  listAllChi: any[] = []
  date = new Date();
  files: File[] = [];
  selectedcode: any;
  selectedcontract: any;
  selectedchi: any;
  filename: string;
  selectedreview: any;
  selectedtype: any = "Phiếu thu";
  selectedpay: any = "Tiền mặt";
  selectedplan: any;;
  customer: any;
  user: any;
  listAllThuChi: any[] = [];
  listStatus: any[] = [];
  listContract: any[] = [];
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private _thuchi_services: ThuChiService,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder, public modal: NgbActiveModal
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));


    console.log("role_deparment", this.user.role_deparment)
  }


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
      this.cdr.detectChanges();
    })
  }
  getAllSuppliers() {
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
    this._thuchi_services.getAllSuppliers(body).subscribe(res => {
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
      this.cdr.detectChanges();

    })
  }
  ngOnInit(): void {
    this.selectedplan = 2
    this.GetAllReviewer();
    this.getAllSuppliers();
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
      const sb = this._thuchi_services.GetPlanById_Chi(this.id).subscribe((customer: any) => {
        let itemdata =
        {
          // end_day: this.convertDate(customer.end_date),
          // dateOfBbirth: this.convertDate(customer.start_date),

        }
        this.selectedplan = customer.status_id
        this.selectedcode = customer.contract_id
        this.selectedtype = customer.type
        this.selectedpay = customer.type_pay
        this.customer = itemdata;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      total: [this.customer.total, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(12)])],
      dob: [this.customer.dateOfBbirth, Validators.compose([Validators.nullValidator])],
      gender: [this.customer.gender, Validators.compose([Validators.required])],

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
      Total_amount: Number.parseInt(this.customer.total),
      type: this.selectedtype,
      Img: this.filename,
      Date_bill: moment(this.customer.dob).format('YYYY/MM/DD HH:mm:ss') + "Z",
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
    const roles = this.user.role_deparment;
    let item =
    {
      amount: Number.parseInt(this.customer.total),
      type_pay: this.selectedpay,
      idexpenses: this.selectedchi,
      Img: "http://localhost:3000/uploads/" + this.filename,
      Pay_date: moment(this.customer.dob).format('YYYY/MM/DD HH:mm:ss') + "Z",
      // end_date: moment(this.customer.endday).format('YYYY/MM/DD HH:mm:ss'),
      approved_by: Number.parseInt(this.selectedreview),
      account_id: this.user.account_id,
      status: roles == 'all' ? 1 : 0,
      // contract_id: Number.parseInt(this.selectedcontract),
      idsuppliers: Number.parseInt(this.selectedcode),
      // contract_id: this.selectedcode
    }
    console.log("item", item)


    const sbCreate = this._thuchi_services.addPay(item).pipe(
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

  }
  list_image: any[] = [];
  onSelectFile_PDF(event) {
    this.list_image = []
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
