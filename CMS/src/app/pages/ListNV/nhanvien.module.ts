import { DeleteEntityDialogComponent } from './../../modules/auth/crud/delete-entity-dialog/delete-entity-dialog.component';
import { LayoutUtilsService } from './../../modules/auth/crud/utils/layout-utils.service';
import { ActionNotificationComponent } from './../../modules/auth/crud/action-natification/action-notification.component';
import { CRUDTableModule } from './../../_metronic/shared/crud-table/crud-table.module';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { DsnhanvienComponent } from './dsnhanvien/dsnhanvien.component';
import { PhanquyenComponent } from './phanquyen/phanquyen.component';
import { PhongbanComponent } from './phongban/phongban.component';
import { TeamComponent } from './team/team.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AddnvComponent } from './addnv/addnv.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddphongbanComponent } from './addphongban/addphongban.component';
import { UpdatePhongbanComponent } from './update-phongban/update-phongban.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateNhanvienComponent } from './update-nhanvien/update-nhanvien.component';
import { DanhSachNguoiDungComponent } from './phanquyen/danh-sach-nguoi-dung/danh-sach-nguoi-dung.component';
import { DanhSanhNhomComponent } from './phanquyen/danh-sanh-nhom/danh-sanh-nhom.component';
import { LoaddsUserComponent } from './phanquyen/danh-sanh-nhom/loadds-user/loadds-user.component';
import { UpdateRolesComponent } from './phanquyen/danh-sach-nguoi-dung/update-roles/update-roles.component';
import { NewGroupRolesComponent } from './phanquyen/danh-sanh-nhom/new-group-roles/new-group-roles.component';
import { SeeRolesComponent } from './phanquyen/danh-sanh-nhom/see-roles/see-roles.component';
import { UpdateRolesGroupComponent } from './phanquyen/danh-sanh-nhom/update-roles-group/update-roles-group.component';
import { UpdateRoleDepartmentComponent } from './update-phongban/update-role-department/update-role-department.component';
@NgModule({
  declarations: [DsnhanvienComponent, DeleteEntityDialogComponent, ActionNotificationComponent, PhanquyenComponent, PhongbanComponent, TeamComponent, AddnvComponent,
    AddphongbanComponent, UpdatePhongbanComponent, UpdateNhanvienComponent, DanhSachNguoiDungComponent, DanhSanhNhomComponent, LoaddsUserComponent, UpdateRolesComponent, NewGroupRolesComponent, SeeRolesComponent, UpdateRolesGroupComponent, UpdateRoleDepartmentComponent],
  imports: [
    MatIconModule,
    NgbModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    MatTabsModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    CRUDTableModule,
    RouterModule.forChild([

      {
        path: 'dsnhanvien',
        component: DsnhanvienComponent,
      },

      {
        path: 'phanquyen',
        component: PhanquyenComponent,
      },
      {
        path: 'phongban',
        component: PhongbanComponent,
      },
      {
        path: 'team',
        component: TeamComponent,
      },

    ]),
  ],
  entryComponents: [AddnvComponent, AddphongbanComponent,
    UpdateNhanvienComponent,
    LoaddsUserComponent,
    UpdatePhongbanComponent, ActionNotificationComponent, DeleteEntityDialogComponent],
  providers: [LayoutUtilsService]

})
export class NhanvienModule { }
