import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { GroupingState } from './../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../_metronic/shared/crud-table/models/sort.model';
import { environment } from './../../../../environments/environment';
import { PaginatorState } from './../../../_metronic/shared/crud-table/models/paginator.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddphongbanComponent } from '../addphongban/addphongban.component';
import { PhongbanService } from './phongban.service';
import { TranslateService } from '@ngx-translate/core';
import { UpdatePhongbanComponent } from '../update-phongban/update-phongban.component';

@Component({
  selector: 'app-phongban',
  templateUrl: './phongban.component.html',
  styleUrls: ['./phongban.component.scss']
})
export class PhongbanComponent implements OnInit {

  api = environment.apiUrl;
  apiacount = this.api + "/api/depart/getAllDepartment"
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
  user: any
  constructor(
    private translate: TranslateService,
    private layoutUtilsService: LayoutUtilsService,
    public _phongban_services: PhongbanService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  paginate(paginator: PaginatorState) {
    this._phongban_services.patchStateAllPhongBan({ paginator }, this.apiacount);
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
    this._phongban_services.patchStateAllPhongBan({ sorting }, this.apiacount);
  }

  LoadAllPhongBan() {
    const filter = {};
    this._phongban_services.patchStateAllPhongBan({ filter }, this.apiacount);

  }
  Add() {
    const dialogRef = this.dialog.open(AddphongbanComponent, {
      width: '600px',
      // data: {  },
      // with:'500px',


    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllPhongBan()
      }
    })


  }

  Delete(id) {
    const _title = this.translate.instant('Xóa phòng ban');
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
        this._phongban_services.deleteDepartment(id).subscribe(res => {
          if (res && res.status == 1) {
            this.LoadAllPhongBan();
            this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
          }
          else {
            this.layoutUtilsService.showActionNotification("Không thể xóa phòng ban", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
          }

        })
      }

    });
  }

  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }
  ngOnInit(): void {
    this.LoadAllPhongBan();
    this.paginator = this._phongban_services.paginator;

  }

  saverange(value) {
    this.search(value)

  }

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['departmentName'] = value

      this._phongban_services.patchStateAllPhongBan({ filter }, this.apiacount);
    }
    else {

      const filter = {};


      this._phongban_services.patchStateAllPhongBan({ filter }, this.apiacount);
    }

  }

  Update(item) {

    const dialogRef = this.dialog.open(UpdatePhongbanComponent, {
      data: { item },

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllPhongBan()
      }
    })

  }
}
