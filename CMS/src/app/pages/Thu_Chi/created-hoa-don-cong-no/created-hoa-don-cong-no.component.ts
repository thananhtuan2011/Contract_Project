import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ThuChiService } from '../thuchi.service';
import * as moment from 'moment';

@Component({
  selector: 'app-created-hoa-don-cong-no',
  templateUrl: './created-hoa-don-cong-no.component.html',
  styleUrls: ['./created-hoa-don-cong-no.component.scss']
})
export class CreatedHoaDonCongNoComponent implements OnInit {
  files: File[] = [];
  date = new Date();

  filename: string;
  selected_contact: any;
  selected_customer: any;
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  user: any
  // private fields

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    public _thuchi_services: ThuChiService,
    private dialogRef: MatDialogRef<CreatedHoaDonCongNoComponent>,
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  listLevel: any[] = []
  getAllLevel() {
    // this._sup_services.getAllLevel().subscribe(res => {
    //   this.listLevel = res.data;
    //   this.selectedlevel = 1;
    //   this.cdr.detectChanges();
    // })
  }
  listAllCustomer: any[] = []

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
  listAllContact: any[] = []

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
      this.listAllContact = res.data;
      console.log("cccontact", this.listAllContact)
      this.cdr.detectChanges();
    })
  }
  ngOnInit(): void {
    this.initForm();
    this.getAllLevel();
    this.getAllContracts();
    this.getAllCustomers();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {

        amount: [
          '',
          Validators.compose([
            Validators.required,

          ]),
        ],

      },

    );
  }

  submit() {
    let item =
    {
      customer_id: Number.parseInt(this.selected_customer),
      contract_id: Number.parseInt(this.selected_contact),
      date_debt: moment(this.date).format('YYYY/MM/DD HH:mm:ss'),
      Img: "http://localhost:3000/uploads/" + this.filename,
      amount: this.registrationForm.controls['amount'].value,
      account_id: this.user.account_id,
      // idtype_suppliers: this.selectedtype,
      // id_level: this.selectedlevel
    }


    this._thuchi_services.addDebt(item).subscribe(res => {
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
  goBack() {
    this.dialogRef.close();
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }

}
