import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ThuChiService } from '../thuchi.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-danhmuc-chi',
  templateUrl: './update-danhmuc-chi.component.html',
  styleUrls: ['./update-danhmuc-chi.component.scss']
})
export class UpdateDanhmucChiComponent implements OnInit {
  note: string;
  idcode: string;
  name: string;
  type: string;
  constructor(public _thuchi_services: ThuChiService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef: MatDialogRef<UpdateDanhmucChiComponent>,
  ) { }

  ngOnInit(): void {
    console.log("datadata", this.data)
    this.idcode = this.data.item.idexpenses
    this.name = this.data.item.name_expenses
    this.type = this.data.item.type
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
      idexpenses: this.idcode,
      name_expenses: this.name,
      note: this.note,
      type: this.type
    }
    console.log("itemitem", item)

    this._thuchi_services.UpdateDM_Chi(this.data.item.idexpenses, item).subscribe(res => {
      this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      this.CloseDia(res)
    })

  }

}
