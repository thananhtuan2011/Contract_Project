import { environment } from './../../../../environments/environment';
import { PaginatorState } from './../../../_metronic/shared/crud-table/models/paginator.model';
import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { GroupingState } from './../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../_metronic/shared/crud-table/models/sort.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupplierService } from './supplier.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { UpdateSuppierComponent } from './update-suppier/update-suppier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  api = environment.apiUrl;
  apiacount = this.api + "/api/ncc/getAllSuppliers"
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
  constructor(
    private layoutUtilsService: LayoutUtilsService,

    private translate: TranslateService,
    public _sup_services: SupplierService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  paginate(paginator: PaginatorState) {
    this._sup_services.patchStateAllSup({ paginator }, this.apiacount);
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
    this._sup_services.patchStateAllSup({ sorting }, this.apiacount);
  }

  LoadAllCustomer() {
    const filter = {};
    this._sup_services.patchStateAllSup({ filter }, this.apiacount);

  }
  Add() {
    const dialogRef = this.dialog.open(AddSupplierComponent, {
      width: '600px',
      height: '600px'
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
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }
  // GetAllDerpatment() {
  //   let body = {
  //     "filter": {

  //     },
  //     "paginator": {
  //       "total": 0,
  //       "totalpage": 0,
  //       "page": 1,
  //       "pageSize": 10000,
  //       "pageSizes": [
  //         0
  //       ]
  //     },

  //     "sorting": {

  //     }
  //   }
  //   this._phongban_servics.getAllDepartment(body).subscribe(res => {
  //     this.listDepartment = res.data;
  //     this.cdr.detectChanges();
  //   })
  // }
  ngOnInit(): void {
    this.LoadAllCustomer();
    // this.GetAllDerpatment();
    this.paginator = this._sup_services.paginator;

  }

  saverange(value) {
    this.search(value)

  }

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['supplieName'] = value

      this._sup_services.patchStateAllSup({ filter }, this.apiacount);
    }
    else {

      const filter = {};


      this._sup_services.patchStateAllSup({ filter }, this.apiacount);
    }

  }
  Delete(id) {
    const _title = this.translate.instant('Xóa Supplier');
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
        this._sup_services.deleteSup(id).subscribe(res => {
          if (res) {
            this.LoadAllCustomer();
            this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }
  Update(item) {

    const dialogRef = this.dialog.open(UpdateSuppierComponent, {
      height: '600px',
      width: '40%',
      data: { item },

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllCustomer()
      }
    })

  }

  onDepartmentSelection() {

    const filter = { department_id: this.selected };
    this._sup_services.patchStateAllSup({ filter }, this.apiacount);
  }

}
