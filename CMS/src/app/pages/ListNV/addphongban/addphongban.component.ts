import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PhongbanService } from '../phongban/phongban.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addphongban',
  templateUrl: './addphongban.component.html',
  styleUrls: ['./addphongban.component.scss']
})
export class AddphongbanComponent implements OnInit {
  tenphongban: string;
  constructor(public _phongban_services: PhongbanService,
    private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialogRef: MatDialogRef<AddphongbanComponent>,
  ) { }

  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {
    let item = {
      departmentName: this.tenphongban
    }
    this._phongban_services.addDepartment(item).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }

    })
  }
  goBack() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
