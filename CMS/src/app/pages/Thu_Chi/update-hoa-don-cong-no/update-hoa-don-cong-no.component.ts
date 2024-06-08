import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ThuChiService } from '../thuchi.service';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-hoa-don-cong-no',
  templateUrl: './update-hoa-don-cong-no.component.html',
  styleUrls: ['./update-hoa-don-cong-no.component.scss']
})
export class UpdateHoaDonCongNoComponent implements OnInit {
  files: File[] = [];
  isuploadfile: boolean = false
  date: NgbDateStruct; // July, 14 1789
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateHoaDonCongNoComponent>,
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
  convertDate(dateString) {
    var p = dateString.split(/\D/g)
    return { year: Number.parseInt(p[0]), month: Number.parseInt(p[1]), day: Number.parseInt(p[2]) + 1 }
  }
  ngOnInit(): void {
    this.list_image.push(this.data.item.Img)
    this.selected_customer = this.data.item.customer_id
    this.selected_contact = this.data.item.contract_id
    this.date = this.convertDate(this.data.item.date_debt)
    // { year: 1789, month: 7, day: 14 };
    // this.date = this.convertDate(this.data.item.date_debt)

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
          this.data.item.amount,
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
      Img: this.isuploadfile == false ? this.list_image[0] : "http://localhost:3000/uploads/" + this.filename,
      amount: this.registrationForm.controls['amount'].value,
      account_id: this.user.account_id,

    }


    this._thuchi_services.UpdateDebt_invoice(this.data.item.idDebt_bills, item).subscribe(res => {
      if (res && res.status == 1) {
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }
      else {
        this.layoutUtilsService.showActionNotification("Fail ", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
        // this.goBack();
      }

    })

  }
  list_image: any[] = [];
  onSelectFile_PDF(event) {
    this.isuploadfile = true
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
