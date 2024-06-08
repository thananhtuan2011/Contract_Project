import { LayoutUtilsService } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { ThuChiService } from '../thuchi.service';

@Component({
  selector: 'app-update-danhmuc-thu',
  templateUrl: './update-danhmuc-thu.component.html',
  styleUrls: ['./update-danhmuc-thu.component.scss']
})
export class UpdateDanhmucThuComponent implements OnInit {
  note: string;
  idcode: string;
  name: string;
  constructor(public _thuchi_services: ThuChiService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef: MatDialogRef<UpdateDanhmucThuComponent>,
  ) { }

  ngOnInit(): void {

    this.name = this.data.item.name_code
    this.idcode = this.data.item.id_code
    this.note = this.data.item.note
  }

  goback() {
    this.dialogRef.close()

  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }

  Save() {
    let item = {
      id_code: this.idcode,
      name_code: this.name,
      note: this.note
    }

    this._thuchi_services.Update_DM_Thu(this.data.item.id_code, item).subscribe(res => {
      this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      this.CloseDia(res)
    })

  }

}
