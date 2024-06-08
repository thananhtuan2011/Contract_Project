import { LayoutUtilsService, MessageType } from './../../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from '../supplier.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {

  selectedtype: any;
  selectedlevel: any;
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  user: any
  // private fields

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    public _sup_services: SupplierService,
    private dialogRef: MatDialogRef<AddSupplierComponent>,
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }
  listType_sup: any[] = []
  getAllTypeSup() {
    this._sup_services.getAlltype_suppliers().subscribe(res => {
      this.listType_sup = res.data;
      this.cdr.detectChanges();
    })
  }
  listLevel: any[] = []
  getAllLevel() {
    this._sup_services.getAllLevel().subscribe(res => {
      this.listLevel = res.data;
      this.selectedlevel = 1;
      this.cdr.detectChanges();
    })
  }
  ngOnInit(): void {
    this.initForm();
    this.getAllLevel();
    this.getAllTypeSup();
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

  submit() {
    let item =
    {
      supName: this.registrationForm.controls['customerName'].value,
      email: this.registrationForm.controls['email'].value,
      phone: this.registrationForm.controls['phone'].value,
      address: this.registrationForm.controls['address'].value,
      account_id: this.user.account_id,
      idtype_suppliers: this.selectedtype,
      id_level: this.selectedlevel
    }

    this._sup_services.addSupp(item).subscribe(res => {
      if (res && res.status == 1) {
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
