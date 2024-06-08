import { LayoutUtilsService, MessageType } from './../../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AcountService } from '../../acount.service';

@Component({
  selector: 'app-update-role-department',
  templateUrl: './update-role-department.component.html',
  styleUrls: ['./update-role-department.component.scss']
})
export class UpdateRoleDepartmentComponent implements OnInit {

  listGroup: any[] = [{
    GroupName: "user"
  },
  {
    GroupName: "admin"
  }];
  empty: boolean = false;
  radioSelected: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _acount_servics: AcountService,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef: MatDialogRef<UpdateRoleDepartmentComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  // GetGroup() {
  //   this._phanquyen_servics.GetGroupPermiss().subscribe(res => {
  //     this.listGroup = res;
  //     console.log('fffff', this.listGroup)
  //     this.cdr.detectChanges();
  //   })
  // }
  // GetRoleUser() {
  //   this._phanquyen_servics.GetGroupRoleUser(this.data.item.account_id).subscribe(res => {
  //     console.log("ress", res)
  //     if (res.length == 0) {
  //       this.empty = true;
  //       this.cdr.detectChanges();
  //     }
  //     else {
  //       let index = this.listGroup.findIndex(x => x.permiss_group == res[0].permiss_group);


  //       if (index >= 0) {
  //         this.radioSelected = this.listGroup[index].permiss_group;
  //         this.cdr.detectChanges();
  //       }
  //     }
  //   })

  // }
  ngOnInit(): void {

    if (this.data.item.role_deparment == "admin") {
      this.radioSelected = this.listGroup[1].GroupName;
    }
    else if (this.data.item.role_deparment == "user") {
      this.radioSelected = this.listGroup[0].GroupName;
    }
    else {
      this.empty = true;
    }
    // this.GetGroup()
    // setTimeout(() => {
    //   this.GetRoleUser();

    // }, 500);
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  submit() {
    let item = {
      role_deparment: this.radioSelected,
    }

    this._acount_servics.updateAcountRoleDeparment(item, this.data.item.account_id).subscribe(res => {
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
