import { MessageType } from './../../../../modules/auth/crud/utils/layout-utils.service';
import { environment } from 'src/environments/environment';
import { GroupingState } from './../../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../../_metronic/shared/crud-table/models/sort.model';
import { PaginatorState } from './../../../../_metronic/shared/crud-table/models/paginator.model';
import { LayoutUtilsService } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { UpdateNhanvienComponent } from './../../update-nhanvien/update-nhanvien.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AcountService } from '../../acount.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UpdateRolesComponent } from './update-roles/update-roles.component';

@Component({
  selector: 'app-danh-sach-nguoi-dung',
  templateUrl: './danh-sach-nguoi-dung.component.html',
  styleUrls: ['./danh-sach-nguoi-dung.component.scss']
})
export class DanhSachNguoiDungComponent implements OnInit {
  api = environment.apiUrl;
  apiacount = this.api + "/api/acounts/getallacount"
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
    private layoutUtilsService: LayoutUtilsService,
    public _acount_services: AcountService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {

  }
  paginate(paginator: PaginatorState) {
    this._acount_services.patchStateAllAcount({ paginator }, this.apiacount);
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
    this._acount_services.patchStateAllAcount({ sorting }, this.apiacount);
  }

  LoadAllAcount() {
    const filter = {};
    this._acount_services.patchStateAllAcount({ filter }, this.apiacount);

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
    this.LoadAllAcount();
    this.paginator = this._acount_services.paginator;

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

      this._acount_services.patchStateAllAcount({ filter }, this.apiacount);
    }
    else {

      const filter = {};


      this._acount_services.patchStateAllAcount({ filter }, this.apiacount);
    }

  }
  Delete(id) {
    const _title = this.translate.instant('Xóa acount');
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
        this._acount_services.deleteAccount(id).subscribe(res => {
          if (res) {
            this.LoadAllAcount();
            this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }
  Update(item) {

    const dialogRef = this.dialog.open(UpdateRolesComponent, {
      width: '500px',
      data: { item },

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllAcount()
      }
    })

  }
}
