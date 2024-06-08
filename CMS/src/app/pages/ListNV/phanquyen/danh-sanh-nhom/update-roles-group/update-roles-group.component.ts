import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PhanquyenService } from '../../phanquyen.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';

@Component({
  selector: 'app-update-roles-group',
  templateUrl: './update-roles-group.component.html',
  styleUrls: ['./update-roles-group.component.scss']
})
export class UpdateRolesGroupComponent implements OnInit {


  nameGroup: string;
  listNotInGroup: any[] = []
  listAction: any[] = []
  listCheck: any[] = []
  constructor(private _phanquyen_service: PhanquyenService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef: MatDialogRef<UpdateRolesGroupComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  getPermissNotInGroup(id) {
    this._phanquyen_service.getPermissNotInGroup(id).subscribe(res => {
      this.listNotInGroup = res;
      this.cdr.detectChanges();
    })
  }
  goBack() {
    this.dialogRef.close();
  }

  getAllroles(id) {
    // getPermiss
    this._phanquyen_service.getPermiss(id).subscribe(res => {
      console.log("fđffff", res)
      this.listAction = res;
      this.listadd = res;
      this.cdr.detectChanges();
      console.log("listAction", this.listAction)
    })
  }
  listchoose: any[] = [];
  findIndexToUpdate(type) {
    return type.role_id === this;
  }
  listadd: any[] = [];
  updateItem(e, type) {
    if (e.target.checked) {
      this.listadd.push(type);
      // console.log("adđ", this.listadd);
    }
    else {
      let index = this.listadd.findIndex(x => x.role_id == type.role_id);

      if (index >= 0) {
        this.listadd.splice(index, 1);
      }


      // console.log("listadd ", this.listadd);
      console.log("xóa ", type);
    }
  }
  Add() {
    console.log("listadd ", this.listadd);
    let item = {
      permission_id: this.data.item,
      listupdate: this.listadd
    }
    this._phanquyen_service.updateRolesPermis(item).subscribe(res => {

      if (res) {

        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.goBack();
      }

    })
  }
  ngOnInit(): void {

    this.getAllroles(this.data.item);
    this.getPermissNotInGroup(this.data.item);

    setTimeout(() => {
      this.listCheck = this.listAction.concat(this.listNotInGroup);
      console.log(" this.listCheck this.listCheck", this.listCheck)
    }, 1000);
  }


}
