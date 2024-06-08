import { MessageType } from './../../../../../modules/auth/crud/utils/layout-utils.service';
import { LayoutUtilsService } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { SortState } from './../../../../../_metronic/shared/crud-table/models/sort.model';
import { GroupingState } from './../../../../../_metronic/shared/crud-table/models/grouping.model';
import { environment } from 'src/environments/environment';
import { PaginatorState } from './../../../../../_metronic/shared/crud-table/models/paginator.model';
import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { PhanquyenService } from '../../phanquyen.service';

@Component({
  selector: 'app-loadds-user',
  templateUrl: './loadds-user.component.html',
  styleUrls: ['./loadds-user.component.scss']
})
export class LoaddsUserComponent implements OnInit {

  api = environment.apiUrl;
  apiacount = this.api + "/api/permiss_user/getPermiss_Bypermisson"
  paginator: PaginatorState;
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;

  searchtext: string
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    public _phanquyen_services: PhanquyenService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {

  }
  paginate(paginator: PaginatorState) {
    this._phanquyen_services.patchStateAllAcountRoles({ paginator }, this.apiacount + "/" + this.data.item.permission_id);
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
    this._phanquyen_services.patchStateAllAcountRoles({ sorting }, this.apiacount + "/" + this.data.item.permission_id);
  }

  LoadAllAcount() {
    const filter = {};
    this._phanquyen_services.patchStateAllAcountRoles({ filter }, this.apiacount + "/" + this.data.item.permission_id);

  }
  Add() {
    // const dialogRef = this.dialog.open(AddnvComponent, {
    //   width: '600px',
    //   // data: {  },
    //   // with:'500px',

    //   // panelClass:'no-padding'

    // });
    // dialogRef.afterClosed().subscribe(res => {

    //   if (res) {
    //     this.LoadAllAcount()
    //   }
    // })


  }
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }
  ngOnInit(): void {

    console.log("gggg", this.data.item.permission_id)
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

      this._phanquyen_services.patchStateAllAcountRoles({ filter }, this.apiacount + "/" + this.data.item.permission_id);
    }
    else {

      const filter = {};


      this._phanquyen_services.patchStateAllAcountRoles({ filter }, this.apiacount + "/" + this.data.item.permission_id);
    }

  }
  Delete(id) {
    const _title = this.translate.instant('Xóa Acount');
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
        this._phanquyen_services.DeleteGroupRoles(id).subscribe(res => {
          if (res) {
            this.LoadAllAcount();
            this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }


}
