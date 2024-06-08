import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PhanquyenService } from '../../phanquyen.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-group-roles',
  templateUrl: './new-group-roles.component.html',
  styleUrls: ['./new-group-roles.component.scss']
})
export class NewGroupRolesComponent implements OnInit {
  nameGroup: string;
  listAll: any[] = []
  constructor(private _phanquyen_service: PhanquyenService,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<NewGroupRolesComponent>,
  ) { }

  getAllroles() {
    this._phanquyen_service.getPermissAll().subscribe(res => {
      this.listAll = res;
      this.cdr.detectChanges();
    })
  }
  listchoose: any[] = [];
  findIndexToUpdate(type) {
    return type.id === this;
  }
  updateItem(e, type) {
    if (e.target.checked) {
      this.listchoose.push(type);
    }
    else {
      let updateItem = this.listchoose.find(this.findIndexToUpdate, type);

      let index = this.listchoose.indexOf(updateItem);

      this.listchoose.splice(index, 1);
    }
  }
  Add() {
    let item = {
      GroupName: this.nameGroup,
      listRoles: this.listchoose
    }
    this._phanquyen_service.addGroupRolesWithPermiss(item).subscribe(res => {
      this.dialogRef.close(res);
    })
  }
  goBack() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.getAllroles();
  }

}
