import { LayoutUtilsService, MessageType } from './../../../modules/auth/crud/utils/layout-utils.service';
import { GroupingState } from './../../../_metronic/shared/crud-table/models/grouping.model';
import { SortState } from './../../../_metronic/shared/crud-table/models/sort.model';
import { environment } from './../../../../environments/environment';
import { PaginatorState } from './../../../_metronic/shared/crud-table/models/paginator.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AcountService } from '../../ListNV/acount.service';
import { PhongbanService } from '../../ListNV/phongban/phongban.service';
import { CustomerService } from '../customer.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import * as FileSaver from 'file-saver';
import * as Excel from "exceljs/dist/exceljs.min.js";
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  api = environment.apiUrl;
  apiacount = this.api + "/api/cus/getallcustomer"
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
    public _customer_services: CustomerService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  paginate(paginator: PaginatorState) {
    this._customer_services.patchStateAllCustomer({ paginator }, this.apiacount);
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
    this._customer_services.patchStateAllCustomer({ sorting }, this.apiacount);
  }

  LoadAllCustomer() {
    const filter = {};
    this._customer_services.patchStateAllCustomer({ filter }, this.apiacount);

  }
  Add() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
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
  getHeight(): any {
    let tmp_height = 0;
    tmp_height = window.innerHeight - 236;
    return tmp_height + 'px';
  }
  GetAllSup() {
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
    this._customer_services.getAllSupplier(body).subscribe(res => {
      this.listSup = res.data;
      console.log("this.listSup", this.listSup)
      this.cdr.detectChanges();
    })
  }
  ngOnInit(): void {
    this.LoadAllCustomer();
    this.GetAllSup();
    this.paginator = this._customer_services.paginator;

  }

  saverange(value) {
    this.search(value)

  }

  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['customerName'] = value

      this._customer_services.patchStateAllCustomer({ filter }, this.apiacount);
    }
    else {

      const filter = {};


      this._customer_services.patchStateAllCustomer({ filter }, this.apiacount);
    }

  }
  Delete(id) {
    const _title = this.translate.instant('Xóa customer');
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
        this._customer_services.deleteCustomer(id).subscribe(res => {
          if (res) {
            this.LoadAllCustomer();
            this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }
  Update(item) {

    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      height: '600px',

      data: { item },

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllCustomer()
      }
    })

  }
  listExport: any[] = [];

  exportTable() {
    this._customer_services._itemsCustomer$.subscribe(res => {
      this.listExport = [];
      res.forEach(element => {
        let item = {
          customer_id: element.customer_id,
          address: element.address,
          customerName: element.customerName,
          phone: element.phone,
          level: element.level,
          type: element.type,
          createdAt: element.createdAt,
          email: element.email,
          // customer_id:element.element
        }
        this.listExport.push(item);

      });

      console.log("listExport", this.listExport)





    })
    var options = {
      filename: './streamed-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true
    };
    let workbook = new Excel.Workbook(options);

    // workbook.creator = 'Me';
    // workbook.lastModifiedBy = 'Her';
    // workbook.created = new Date(1985, 8, 30);
    // workbook.modified = new Date();
    // workbook.lastPrinted = new Date(2016, 9, 27);
    // create a sheet with red tab colour
    var worksheet = workbook.addWorksheet('My Sheet', { properties: { tabColor: { argb: 'FFC0000' } } });
    // worksheet.columns = [
    //   { header: 'Id', key: 'id', width: 10 },
    //   { header: 'Name', key: 'name', width: 32, style: { font: { name: 'Arial Black', color: { argb: 'FF0000' } } } },
    //   { header: 'D.O.B.', key: 'DOB', width: 10, style: { numFmt: 'dd/mm/yyyy' } }
    // ];
    worksheet.columns = [
      { header: "CustomerId", key: "customer_id", width: 15 },
      { header: "Address", key: "address", width: 15 },
      { header: "CustomerName", key: "customerName", width: 25 },
      { header: "Phone", key: "phone", width: 10 },
      { header: "Level", key: "level", width: 10 },
      { header: "Type", key: "type", width: 10 },
      { header: "createdAt", key: "createdAt", width: 10 },
      { header: "Email", key: "email", width: 10 },
    ];
    this.listExport.forEach(element => {
      worksheet.addRow(element);
    });

    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' }
    }
    let fileName = "customer.xlsx";
    const excelBuffer: any = workbook.xlsx.writeBuffer();
    workbook.xlsx.writeBuffer()
      .then(function (buffer) {
        // done buffering
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(data, fileName);
      });

  }

  onDepartmentSelection() {

    const filter = { idsuppliers: this.selected };
    this._customer_services.patchStateAllCustomer({ filter }, this.apiacount);
  }

}
