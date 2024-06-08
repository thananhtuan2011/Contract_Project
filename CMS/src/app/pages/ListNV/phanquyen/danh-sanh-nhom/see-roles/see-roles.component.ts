import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PhanquyenService } from '../../phanquyen.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-see-roles',
  templateUrl: './see-roles.component.html',
  styleUrls: ['./see-roles.component.scss']
})
export class SeeRolesComponent implements OnInit {

  nameGroup: string;
  listAll: any[] = []
  constructor(private _phanquyen_service: PhanquyenService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SeeRolesComponent>,
    private cdr: ChangeDetectorRef
  ) { }
  goBack() {
    this.dialogRef.close();
  }
  getAllroles(id) {
    // getPermiss
    this._phanquyen_service.getPermiss(id).subscribe(res => {
      this.listAll = res;
      this.cdr.detectChanges();
      console.log("listAlllistAll", this.listAll)
    })
  }
  listchoose: any[] = [];
  findIndexToUpdate(type) {
    return type.id === this;
  }
  updateItem(e, type) {
    if (e.target.checked) {
      this.listchoose.push(type);
      console.log("adđ", this.listchoose);
    }
    else {
      let updateItem = this.listchoose.find(this.findIndexToUpdate, type);

      let index = this.listchoose.indexOf(updateItem);

      this.listchoose.splice(index, 1);
      console.log("xóa ", this.listchoose);
    }
  }
  Add() {
    let item = {
      GroupName: this.nameGroup,
      listRoles: this.listchoose
    }
    this._phanquyen_service.addGroupRolesWithPermiss(item).subscribe(res => {

    })
  }
  ngOnInit(): void {
    this.getAllroles(this.data.item.permission_id);
  }

}
