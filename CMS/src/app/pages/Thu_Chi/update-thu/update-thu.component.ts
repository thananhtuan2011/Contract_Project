import { CustomAdapter, CustomDateParserFormatter } from './../../../_metronic/core/utils/date-picker.utils';
import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { ThuChiService } from '../thuchi.service';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-update-thu',
  templateUrl: './update-thu.component.html',
  styleUrls: ['./update-thu.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class UpdateThuComponent implements OnInit, OnDestroy {
  isuploadfile: boolean = false
  @Input() id: number;
  isLoading$;
  date: NgbDateStruct;
  files: File[] = [];
  selected_customer: any
  filename: string;
  selectedcode: any;
  selectedreview: any;
  selectedtype: any = "Phiếu thu";
  selectedpay: any = "Tiền mặt";
  selectedplan: any;;
  customer: any;
  user: any;
  listAllThuChi: any[] = [];
  listStatus: any[] = [];
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private _thuchi_services: ThuChiService,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder, public modal: NgbActiveModal
  ) { this.user = JSON.parse(localStorage.getItem("user")); }


  listCustomer: any[] = []
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
      this.cdr.detectChanges();
    })
  }
  listAllThu: any[] = []
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
    this.getAllCollection_category();
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
      const sb = this._thuchi_services.GetDebtById(this.id).subscribe((customer: any) => {
        let itemdata =
        {
          id: customer.id_bill,
          dateOfBbirth: this.convertDate(customer.Date_bill),
          status: customer.status,
          gender: customer.type,
          total: customer.Total_amount
        }
        // this.selectedreview = customer.approved_by
        this.selectedcode = customer.id_code
        this.selected_customer = customer.customer_id
        // this.date = this.convertDate(customer.Date_bill)
        this.list_image.push(customer.Img)
        // this.selectedtype = customer.type
        // this.selectedpay = customer.type_pay
        this.customer = itemdata;

        // this.customer.dateOfBbirth = this.convertDate(customer.Date_bill),
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
    }
  }

  edit() {
    let item =
    {
      // Pay: this.customer.reasons,
      Total_amount: this.customer.total,
      type: this.selectedpay,
      Img: this.isuploadfile == false ? this.list_image[0] : "http://localhost:3000/uploads/" + this.filename,
      Date_bill: moment(this.customer.dob).format('YYYY/MM/DD HH:mm:ss') + "Z",
      // end_date: moment(this.customer.endday).format('YYYY/MM/DD HH:mm:ss'),
      id_code: this.selectedcode,
      account_id: this.user.account_id,
      updatedAt: new Date(),
      account_id_update: this.user.account_id,
      customer_id: Number.parseInt(this.selected_customer),
    }
    this._thuchi_services.UpdateThu(this.id, item).subscribe(res => {
      if (this.files) {
        this.onUpload();
      }
      this.layoutUtilsService.showActionNotification(" Update Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      this.modal.close();
    })

  }

  create() {
    let item =
    {
      // Pay: this.customer.reasons,
      Total_amount: this.customer.total,
      type: this.selectedpay,
      Img: "http://localhost:3000/uploads/" + this.filename,
      Date_bill: moment(this.customer.dob).format('YYYY/MM/DD HH:mm:ss') + "Z",
      // end_date: moment(this.customer.endday).format('YYYY/MM/DD HH:mm:ss'),
      approved_by: Number.parseInt(this.selectedreview),
      account_id: this.user.account_id,
      idPlan: Number.parseInt(this.selectedcode),
      // contract_id: this.selectedcode
    }
    const sbCreate = this._thuchi_services.addBills(item).pipe(
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
    this.isuploadfile = true;
    const files = event.target.files;
    var reader = new FileReader();
    let cat: any;
    var file_name = event.target.files;
    this.filename = file_name[0].name;
    if (files) {
      reader.onload = (event) => {
        this.list_image.push(event.target.result);
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
