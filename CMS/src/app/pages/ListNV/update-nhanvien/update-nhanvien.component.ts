import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AcountService } from '../acount.service';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { PhongbanService } from '../phongban/phongban.service';

@Component({
  selector: 'app-update-nhanvien',
  templateUrl: './update-nhanvien.component.html',
  styleUrls: ['./update-nhanvien.component.scss']
})
export class UpdateNhanvienComponent implements OnInit {

  selected: any
  tennv: string;
  pass: string;
  username: string;
  phone: number;
  email: string
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    public _acount_services: AcountService,
    public _phongban_services: PhongbanService,
    private dialogRef: MatDialogRef<UpdateNhanvienComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }
  listPB: any[] = [];
  ngOnInit(): void {
    this.GetallPb();
    this.tennv = this.data.item.fullname
    this.phone = this.data.item.phone
    this.tennv = this.data.item.fullname
    this.email = this.data.item.email
    this.selected = this.data.item.departments.department_id
    this.username = this.data.item.username
    console.log("data", this.data)
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

    // console.log("thjisos", this.selected)
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {
    let datee = new Date()
    let item = {
      email: this.email,
      fullname: this.tennv,
      phone: this.phone,
      department_id: this.selected,
      createdAt: datee,
      updatedAt: null
      // departmentName: this.tenphongban
    }
    this._acount_services.updateAcount(item, this.data.item.account_id).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }

    })
  }
  goBack() {
    this.dialogRef.close();
  }

}
