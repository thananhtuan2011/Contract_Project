import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThuChiService } from '../thuchi.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-created-danhmuc-thu',
  templateUrl: './created-danhmuc-thu.component.html',
  styleUrls: ['./created-danhmuc-thu.component.scss']
})
export class CreatedDanhmucThuComponent implements OnInit {
  note: string;
  idcode: string = '';
  name: string;
  constructor(public _thuchi_services: ThuChiService,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef: MatDialogRef<CreatedDanhmucThuComponent>,
  ) { }

  ngOnInit(): void {
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

    this._thuchi_services.addDM_Thu(item).subscribe(res => {
      this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      this.CloseDia(res)
    })

  }

}
