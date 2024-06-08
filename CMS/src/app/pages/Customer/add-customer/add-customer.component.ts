import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ConfirmPasswordValidator } from './../../../modules/auth/registration/confirm-password.validator';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import * as XLSX from 'xlsx';
type AOA = any[][];



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  registrationForm: FormGroup;
  hasError: boolean;
  isFile: boolean = false
  importdata: boolean = undefined;
  isLoading$: Observable<boolean>;
  user: any
  selectedtype: any;
  selectedlevel: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    public _customer_services: CustomerService,
    private dialogRef: MatDialogRef<AddCustomerComponent>,
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }
  data: any
  formData: any
  namefile: any;
  // onSelectFile_PDF(files: File) {
  //   console.log(files)
  //   this.namefile = files[0].name
  //   this.formData = new FormData();
  //   this.formData.append("excel", files);
  //   // Array.from(files).forEach(f => this.formData.append('image', f))
  //   // this.admin_services.AddFile(formData).subscribe(res => {
  //   //   console.log("ressssss fle", res)
  //   // });
  // }
  onFileChange(evt: any) {

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      this.isFile = false;
      throw new Error('Cannot use multiple files');
    }
    this.formData = new FormData();
    this.formData.append("excel", evt.target.files[0]);
    this.isFile = true;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */

      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  Them() {
    this.importdata = false;
    this.cdr.detectChanges();
  }
  Import() {
    this.importdata = true;
    this.cdr.detectChanges();
  }

  listSup: any[] = []
  GetAllSup() {
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
    this._customer_services.getAllSupplier(body).subscribe(res => {
      this.listSup = res.data;
      this.cdr.detectChanges();
    })
  }

  listType_customer: any[] = []
  getAllTypeCustomer() {
    this._customer_services.getAllTypeCustomer().subscribe(res => {
      this.listType_customer = res.data;
      this.cdr.detectChanges();
    })
  }
  listLevel: any[] = []
  getAllLevel() {
    this._customer_services.getAllLevel().subscribe(res => {
      this.listLevel = res.data;
      this.selectedlevel = 1;
      this.cdr.detectChanges();
    })
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.initForm();
    this.GetAllSup();
    this.getAllLevel();
    this.getAllTypeCustomer();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        customerName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required,

          ]),
        ],
        address: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],

        email: [
          '@gmail.com',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],

      },

    );
  }
  // selected: any
  onGiaSelection() {


  }
  Done() {
    let item = {
      status: 1
    }
    this.CloseDia(item);
  }
  submitImportFile() {
    if (!this.isFile) {
      this.layoutUtilsService.showActionNotification("Vui lòng chọn file !", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
    }
    else {
      this._customer_services.ImportData(this.formData).subscribe(res => {
        if (res && res.status == 1) {
          this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);

        }
        else {
          this.layoutUtilsService.showActionNotification("Định dạng file không hợp lệ !", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
          // this.goBack();
        }

      })
    }

  }
  submit() {
    let item =
    {
      customerName: this.registrationForm.controls['customerName'].value,
      email: this.registrationForm.controls['email'].value,
      phone: this.registrationForm.controls['phone'].value,
      address: this.registrationForm.controls['address'].value,
      account_id: this.user.account_id,
      // idsuppliers: this.selected,
      idtype_customers: this.selectedtype,
      id_level: this.selectedlevel

    }

    this._customer_services.addCustomers(item).subscribe(res => {
      if (res && res.status == 1) {
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
      else {
        this.layoutUtilsService.showActionNotification("Thất bại ", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
        // this.goBack();
      }

    })

  }

  goBack() {
    this.dialogRef.close();
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }

}
