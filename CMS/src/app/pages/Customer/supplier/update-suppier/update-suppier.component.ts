import { LayoutUtilsService, MessageType } from './../../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from '../supplier.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-suppier',
  templateUrl: './update-suppier.component.html',
  styleUrls: ['./update-suppier.component.scss']
})
export class UpdateSuppierComponent implements OnInit {


  selectedtype: any;
  selectedlevel: any;
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  user: any
  // private fields

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    public _sup_services: SupplierService,
    private dialogRef: MatDialogRef<UpdateSuppierComponent>,
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
      // this.selectedlevel = 1;
      this.cdr.detectChanges();
    })
  }
  ngOnInit(): void {
    if (this.data.item.type_suppliers) {
      this.selectedtype = this.data.item.type_suppliers.idtype_suppliers

    }
    if (this.data.item.levels) {
      this.selectedlevel = this.data.item.levels.id_level

    }
    this.getAllLevel();
    this.getAllTypeSup();
    this.initForm();

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        customerName: [
          this.data.item.supplieName,
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

  submit() {
    let item =
    {
      supplieName: this.registrationForm.controls['customerName'].value,
      email: this.registrationForm.controls['email'].value,
      phone: this.registrationForm.controls['phone'].value,
      address: this.registrationForm.controls['address'].value,
      idtype_suppliers: this.selectedtype,
      id_level: this.selectedlevel,
      account_id: this.user.account_id,
    }

    this._sup_services.updateSuppliers(this.data.item.idsuppliers, item).subscribe(res => {
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
