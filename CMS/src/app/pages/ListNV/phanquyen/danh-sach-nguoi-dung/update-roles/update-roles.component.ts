import { LayoutUtilsService, MessageType } from './../../../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PhanquyenService } from '../../phanquyen.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-roles',
  templateUrl: './update-roles.component.html',
  styleUrls: ['./update-roles.component.scss']
})
export class UpdateRolesComponent implements OnInit {
  listGroup: any[] = [];
  empty: boolean = false;
  radioSelected: any;
  constructor(private _phanquyen_servics: PhanquyenService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef: MatDialogRef<UpdateRolesComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  GetGroup() {
    this._phanquyen_servics.GetGroupPermiss().subscribe(res => {
      this.listGroup = res;
      this.cdr.detectChanges();
    })
  }
  GetRoleUser() {
    this._phanquyen_servics.GetGroupRoleUser(this.data.item.account_id).subscribe(res => {
      console.log("ress", res)
      if (res.length == 0) {
        this.empty = true;
        this.cdr.detectChanges();
      }
      else {
        let index = this.listGroup.findIndex(x => x.permiss_group == res[0].permiss_group);


        if (index >= 0) {
          this.radioSelected = this.listGroup[index].permiss_group;
          this.cdr.detectChanges();
        }
      }
    })

  }
  ngOnInit(): void {
    console.log("rrrrr", this.data)
    this.GetGroup()
    setTimeout(() => {
      this.GetRoleUser();

    }, 500);
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {
    let item = {
      account_id: this.data.item.account_id,
      permiss_group: this.radioSelected
    }

    this._phanquyen_servics.addGroupAcountRoles(item).subscribe(res => {
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
