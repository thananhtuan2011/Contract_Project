import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { GroupingState } from './../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../_metronic/shared/crud-table/models/sort.model';
import { PaginatorState } from './../../../_metronic/shared/crud-table/models/paginator.model';
import { environment } from './../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThuChiService } from '../thuchi.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatedDanhmucThuComponent } from '../created-danhmuc-thu/created-danhmuc-thu.component';
import { UpdateDanhmucThuComponent } from '../update-danhmuc-thu/update-danhmuc-thu.component';

@Component({
  selector: 'app-danhmuc-thu',
  templateUrl: './danhmuc-thu.component.html',
  styleUrls: ['./danhmuc-thu.component.scss']
})
export class DanhmucThuComponent implements OnInit {



  api = environment.apiUrl;
  apiacount = this.api + "/api/thuchi/getAllCollection_category"
  paginator: PaginatorState;
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  listSup: any[] = [];
  searchtext: string
  selected: any;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  user: any
  constructor(
    private layoutUtilsService: LayoutUtilsService,

    private translate: TranslateService,
    public _thuchi_services: ThuChiService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  paginate(paginator: PaginatorState) {
    this._thuchi_services.patchStateDanhMucThu({ paginator }, this.apiacount);
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
    this._thuchi_services.patchStateDanhMucThu({ sorting }, this.apiacount);
  }

  LoadAllCustomer() {
    const filter = {};
    this._thuchi_services.patchStateDanhMucThu({ filter }, this.apiacount);

  }

  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }

  ngOnInit(): void {
    this.LoadAllCustomer();
    this.paginator = this._thuchi_services.paginator;

  }

  saverange(value) {
    this.search(value)

  }
  Delete(id) {
    const _title = this.translate.instant('Delete');
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
        this._thuchi_services.deleteDM_Thu(id).subscribe(res => {
          if (res) {
            this._thuchi_services.patchStateDanhMucThu({}, this.apiacount);
            this.layoutUtilsService.showActionNotification("Thành công", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }
  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['name_code'] = value

      this._thuchi_services.patchStateDanhMucThu({ filter }, this.apiacount);
    }
    else {

      const filter = {};


      this._thuchi_services.patchStateDanhMucThu({ filter }, this.apiacount);
    }

  }
  Update(item) {

    const dialogRef = this.dialog.open(UpdateDanhmucThuComponent, {
      width: '500px',
      data: { item },

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllCustomer()
      }
    })

  }

  create() {
    const dialogRef = this.dialog.open(CreatedDanhmucThuComponent, {
      width: '600px',
      // data: {  },
      // with:'500px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllCustomer()
      }
    })


  }


}
