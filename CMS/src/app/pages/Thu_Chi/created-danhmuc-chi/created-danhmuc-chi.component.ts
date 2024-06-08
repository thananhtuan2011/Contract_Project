import { MessageType, LayoutUtilsService } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ThuChiService } from '../thuchi.service';

@Component({
  selector: 'app-created-danhmuc-chi',
  templateUrl: './created-danhmuc-chi.component.html',
  styleUrls: ['./created-danhmuc-chi.component.scss']
})
export class CreatedDanhmucChiComponent implements OnInit {
  note: string;
  idcode: string = '';
  name: string;
  type: string;
  constructor(public _thuchi_services: ThuChiService,
    private cdr: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef: MatDialogRef<CreatedDanhmucChiComponent>,
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
      idexpenses: this.idcode,
      name_expenses: this.name,
      note: this.note,
      type: this.type
    }

    this._thuchi_services.addDM_Chi(item).subscribe(res => {
      this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      this.CloseDia(res)
    })

  }
}
