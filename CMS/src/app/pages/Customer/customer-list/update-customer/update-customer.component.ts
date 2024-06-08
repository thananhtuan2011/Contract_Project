import { LayoutUtilsService } from './../../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { CustomerService } from '../../customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  registrationForm: FormGroup;
  hasError: boolean;
  selectedtype: any;
  selectedlevel: any;
  isLoading$: Observable<boolean>;
  user: any
  // private fields

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    public _customer_services: CustomerService,
    private dialogRef: MatDialogRef<UpdateCustomerComponent>,
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
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
      this.cdr.detectChanges();
    })
  }
  ngOnInit(): void {
    if (this.data.item.type_customers) {
      this.selectedtype = this.data.item.type_customers.idtype_customers

    }
    if (this.data.item.levels) {
      this.selectedlevel = this.data.item.levels.id_level

    }
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
          this.data.item.customerName,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        phone: [
          this.data.item.phone,
          Validators.compose([
            Validators.required,

          ]),
        ],
        address: [
          this.data.item.address,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],

        email: [
          this.data.item.email,
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
  onGiaSelection() {


  }
  submit() {
    let item =
    {
      customerName: this.registrationForm.controls['customerName'].value,
      email: this.registrationForm.controls['email'].value,
      phone: this.registrationForm.controls['phone'].value,
      address: this.registrationForm.controls['address'].value,
      account_id: this.user.account_id,
      idtype_customers: this.selectedtype,
      id_level: this.selectedlevel,
      account_id_update: this.user.account_id,
      updatedAt: new Date()
    }

    this._customer_services.updateCustomers(this.data.item.customer_id, item).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
      else {
        this.layoutUtilsService.showActionNotification("Tài khoản đã tồn tại ", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
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
