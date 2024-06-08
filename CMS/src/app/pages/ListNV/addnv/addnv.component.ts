import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PhongbanService } from '../phongban/phongban.service';
import { AcountService } from '../acount.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addnv',
  templateUrl: './addnv.component.html',
  styleUrls: ['./addnv.component.scss']
})
export class AddnvComponent implements OnInit {
  selected: any
  tennv: string;
  fullname: number;
  pass: string;
  username: string;
  phone: number;
  email: string = "@gmail.com"
  constructor(public _phongban_services: PhongbanService,
    private layoutUtilsService: LayoutUtilsService,
    public _acount_services: AcountService,
    private dialogRef: MatDialogRef<AddnvComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }
  listPB: any[] = [];
  ngOnInit(): void {
    this.GetallPb();
  }
  GetallPb() {
    let item = {
      "filter": {

      },
      "paginator": {
        "total": 0,
        "totalpage": 0,
        "page": 1,
        "pageSize": 100000,
        "pageSizes": [
          0
        ]
      },

      "sorting": {

      }
    }
    this._phongban_services.getAllDepartment(item).subscribe(res => {
      this.listPB = res.data;
      this.changeDetectorRefs.detectChanges();

    })
  }
  onGiaSelection() {


  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {
    let datee = new Date()
    let item = {
      username: this.username,
      password: this.pass,
      email: this.email,
      fullname: this.tennv,
      phone: this.phone,
      department_id: this.selected,
      createdAt: datee,
      updatedAt: null
      // departmentName: this.tenphongban
    }
    if (!this.username || !this.pass || !this.email || !this.tennv || !this.phone || !this.selected) {
      this.layoutUtilsService.showActionNotification("Vui lòng nhập đầy đủ thông tin", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
    }
    else {

      this._acount_services.addAcount(item).subscribe(res => {
        if (res.status == 1) {
          this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
          this.CloseDia(res);
        }
        else {
          this.layoutUtilsService.showActionNotification("Tài khoản đã tồn tại ", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
          // this.goBack();
        }

      })
    }

  }
  goBack() {
    this.dialogRef.close();
  }
}
