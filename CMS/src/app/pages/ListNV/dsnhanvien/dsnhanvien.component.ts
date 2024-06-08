import { MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { GroupingState } from './../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../_metronic/shared/crud-table/models/sort.model';
import { PaginatorState } from './../../../_metronic/shared/crud-table/models/paginator.model';
import { BreadcrumbItemModel } from './../../../_metronic/partials/layout/subheader/_models/breadcrumb-item.model';
import { SubheaderService } from './../../../_metronic/partials/layout/subheader/_services/subheader.service';
import { LayoutService } from './../../../_metronic/core/services/layout.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AcountService } from '../acount.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AddnvComponent } from '../addnv/addnv.component';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { UpdateNhanvienComponent } from '../update-nhanvien/update-nhanvien.component';
import { PhongbanService } from '../phongban/phongban.service';

@Component({
  selector: 'app-dsnhanvien',
  templateUrl: './dsnhanvien.component.html',
  styleUrls: ['./dsnhanvien.component.scss']
})
export class DsnhanvienComponent implements OnInit {
  api = environment.apiUrl;
  apiacount = this.api + "/api/acounts/getallacount"
  paginator: PaginatorState;
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  listDepartment: any[] = [];
  description$: Observable<string>;
  searchtext: string
  selected: any;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  user: any
  constructor(
    private layoutUtilsService: LayoutUtilsService,
    public _acount_services: AcountService,
    private _phongban_servics: PhongbanService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
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
    const dialogRef = this.dialog.open(AddnvComponent, {
      width: '600px',
      // data: {  },
      // with:'500px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllAcount()
      }
    })


  }
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }
  GetAllDerpatment() {
    let body = {
      "filter": {

      },
      "paginator": {
        "total": 0,
        "totalpage": 0,
        "page": 1,
        "pageSize": 10000,
        "pageSizes": [
          0
        ]
      },

      "sorting": {

      }
    }
    this._phongban_servics.getAllDepartment(body).subscribe(res => {
      this.listDepartment = res.data;
      this.cdr.detectChanges();
    })
  }
  ngOnInit(): void {
    this.LoadAllAcount();
    this.GetAllDerpatment();
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
            this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }
  Update(item) {

    const dialogRef = this.dialog.open(UpdateNhanvienComponent, {
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

  onDepartmentSelection() {

    const filter = { department_id: this.selected };
    this._acount_services.patchStateAllAcount({ filter }, this.apiacount);
  }
}
