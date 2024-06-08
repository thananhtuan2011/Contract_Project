import { GroupingState } from './../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../_metronic/shared/crud-table/models/sort.model';
import { environment } from './../../../../environments/environment';
import { PaginatorState } from './../../../_metronic/shared/crud-table/models/paginator.model';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PhongbanService } from '../phongban/phongban.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AcountService } from '../acount.service';
import { TranslateService } from '@ngx-translate/core';
import { UpdateRoleDepartmentComponent } from './update-role-department/update-role-department.component';

@Component({
  selector: 'app-update-phongban',
  templateUrl: './update-phongban.component.html',
  styleUrls: ['./update-phongban.component.scss']
})
export class UpdatePhongbanComponent implements OnInit {
  api = environment.apiUrl;
  apiacount = this.api + "/api/acounts/getallacount"
  paginator: PaginatorState;
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  listDepartment: any[] = [];
  searchtext: string
  selected: any;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  user: any
  tenphongban: string;
  constructor(public _phongban_services: PhongbanService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _acount_services: AcountService,
    private _phongban_servics: PhongbanService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private translate: TranslateService,
    private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialogRef: MatDialogRef<UpdatePhongbanComponent>,
  ) { this.user = JSON.parse(localStorage.getItem("user")); }

  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }

  submit() {
    let date = new Date()
    let item = {
      departmentName: this.tenphongban,
      updatedAt: date
    }
    this._phongban_services.updateDepartment(this.data.item.department_id, item).subscribe(res => {
      if (res) {
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        this.CloseDia(res);
      }

    })
  }
  goBack() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.tenphongban = this.data.item.departmentName;

    this.LoadAllAcount();
    this.GetAllDerpatment();
    this.paginator = this._acount_services.paginator;
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
    const filter = { department_id: this.data.item.department_id };
    this._acount_services.patchStateAllAcount({ filter }, this.apiacount);

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
            this.layoutUtilsService.showActionNotification(" Successfully", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }

  Update(item) {

    const dialogRef = this.dialog.open(UpdateRoleDepartmentComponent, {
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
