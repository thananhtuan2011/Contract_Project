import { LayoutUtilsService, MessageType } from './../../../../modules/auth/crud/utils/layout-utils.service';
import { GroupingState } from './../../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../../_metronic/shared/crud-table/models/sort.model';
import { PaginatorState } from './../../../../_metronic/shared/crud-table/models/paginator.model';
import { environment } from './../../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PhanquyenService } from '../phanquyen.service';
import { LoaddsUserComponent } from './loadds-user/loadds-user.component';
import { NewGroupRolesComponent } from './new-group-roles/new-group-roles.component';
import { SeeRolesComponent } from './see-roles/see-roles.component';
import { UpdateRolesGroupComponent } from './update-roles-group/update-roles-group.component';

@Component({
  selector: 'app-danh-sanh-nhom',
  templateUrl: './danh-sanh-nhom.component.html',
  styleUrls: ['./danh-sanh-nhom.component.scss']
})
export class DanhSanhNhomComponent implements OnInit {
  api = environment.apiUrl;
  apiacount = this.api + "/api/permiss_user/getPermiss_User"
  paginator: PaginatorState;
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  title$: Observable<string>;

  searchtext: string
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  constructor(
    private layoutUtilsService: LayoutUtilsService,
    public _phanquyen_services: PhanquyenService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {

  }
  paginate(paginator: PaginatorState) {
    this._phanquyen_services.patchStateAllNhomUser({ paginator }, this.apiacount);
  }
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this._phanquyen_services.patchStateAllNhomUser({ sorting }, this.apiacount);
  }

  LoadAllAcount() {
    const filter = {};
    this._phanquyen_services.patchStateAllNhomUser({ filter }, this.apiacount);

  }
  // Add() {
  //   const dialogRef = this.dialog.open(AddnvComponent, {
  //     width: '600px',
  //     // data: {  },
  //     // with:'500px',

  //     // panelClass:'no-padding'

  //   });
  //   dialogRef.afterClosed().subscribe(res => {

  //     if (res) {
  //       this.LoadAllAcount()
  //     }
  //   })


  // }
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }
  ngOnInit(): void {
    this.LoadAllAcount();
    this.paginator = this._phanquyen_services.paginator;

  }

  saverange(value) {
    this.search(value)

  }

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['fullname'] = value

      this._phanquyen_services.patchStateAllNhomUser({ filter }, this.apiacount);
    }
    else {

      const filter = {};


      this._phanquyen_services.patchStateAllNhomUser({ filter }, this.apiacount);
    }

  }
  Delete(id) {
    const _title = this.translate.instant('Xóa Group');
    const _description = this.translate.instant('Bạn có muốn xóa không ?');
    const _waitDesciption = this.translate.instant('Dữ liệu đang được xử lý');
    const _deleteMessage = this.translate.instant('Xóa thành công !');
    const _erroMessage = this.translate.instant('Thất bại !');
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      else {
        this._phanquyen_services.DeleteGroup(id).subscribe(res => {
          if (res) {
            this.LoadAllAcount();
            this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }

  UpdateRoles(item) {
    const dialogRef = this.dialog.open(UpdateRolesGroupComponent, {

      data: { item },

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllAcount()
      }
    })
  }
  See(item) {
    const dialogRef = this.dialog.open(SeeRolesComponent, {

      data: { item },

      // panelClass:'no-padding'

    });

  }
  loadUser(item) {
    const dialogRef = this.dialog.open(LoaddsUserComponent, {

      data: { item },

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllAcount()
      }
    })
  }
  Update(item) {

    // const dialogRef = this.dialog.open(UpdateNhanvienComponent, {
    //   width: '500px',
    //   data: { item },

    //   // panelClass:'no-padding'

    // });
    // dialogRef.afterClosed().subscribe(res => {

    //   if (res) {
    //     this.LoadAllAcount()
    //   }
    // })

  }
  Add() {
    const dialogRef = this.dialog.open(NewGroupRolesComponent, {
      width: '500px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllAcount()
      }
    })
  }

}
