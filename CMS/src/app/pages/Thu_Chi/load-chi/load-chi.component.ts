import { LayoutUtilsService, MessageType } from 'src/app/modules/auth/crud/utils/layout-utils.service';
import { environment } from 'src/environments/environment';
import { EditCustomerModalComponent } from './../../../modules/e-commerce/customers/components/edit-customer-modal/edit-customer-modal.component';
// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  GroupingState,
  PaginatorState,
  SortState,
  ICreateAction,
  IEditAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IFetchSelectedAction,
  IUpdateStatusForSelectedAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
} from '../../../_metronic/shared/crud-table';
import { DeleteCustomerModalComponent } from 'src/app/modules/e-commerce/customers/components/delete-customer-modal/delete-customer-modal.component';
import { DeleteCustomersModalComponent } from 'src/app/modules/e-commerce/customers/components/delete-customers-modal/delete-customers-modal.component';
import { UpdateCustomersStatusModalComponent } from 'src/app/modules/e-commerce/customers/components/update-customers-status-modal/update-customers-status-modal.component';
import { FetchCustomersModalComponent } from 'src/app/modules/e-commerce/customers/components/fetch-customers-modal/fetch-customers-modal.component';
import { ThuChiService } from '../thuchi.service';
import { AddPlanThuChiComponent } from '../add-plan-thu-chi/add-plan-thu-chi.component';
import { TranslateService } from '@ngx-translate/core';
import { CreatedChiComponent } from '../created-chi/created-chi.component';
import { UpdateChiComponent } from '../update-chi/update-chi.component';
@Component({
  selector: 'app-load-chi',
  templateUrl: './load-chi.component.html',
  styleUrls: ['./load-chi.component.scss']
})
export class LoadChiComponent
  implements
  OnInit,
  OnDestroy,
  ICreateAction,
  IEditAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IFetchSelectedAction,
  IUpdateStatusForSelectedAction,
  ISortView,
  IFilterView,
  IGroupingView,
  ISearchView,
  IFilterView {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  api = environment.apiUrl;
  user: any
  searchtext: string;
  search_date: any = ''
  apithuchi = this.api + "/api/thuchi/getAllPayments"
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private modalService: NgbModal,
    private layoutUtilsService: LayoutUtilsService,

    public _Thu_chiService: ThuChiService
  ) { this.user = JSON.parse(localStorage.getItem("user")); }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    const filter = {};
    this._Thu_chiService.patchStatePayments(filter, this.apithuchi);
    this.grouping = this._Thu_chiService.grouping;
    this.paginator = this._Thu_chiService.paginator;
    this.sorting = this._Thu_chiService.sorting;
    const sb = this._Thu_chiService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  getColor(item) {

    if (item.status_id == 1) {
      return "#09d809"
    }
    else if (item.status_id == 2) {
      return "#f06018"
    }


  }


  saverange_text(value) {
    this.search_text(value)

  }

  search_text(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter = {};
      filter['idexpenses'] = value
      this._Thu_chiService.patchStatePayments({ filter }, this.apithuchi);
    }
    else {

      const filter = {};


      this._Thu_chiService.patchStatePayments({ filter }, this.apithuchi);
    }

  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      type: [''],
      searchTerm: [''],
    });
    this.subscriptions.push(
      this.filterGroup.controls.status.valueChanges.subscribe(() =>
        this.filter()
      )
    );
    this.subscriptions.push(
      this.filterGroup.controls.type.valueChanges.subscribe(() => this.filter())
    );
  }

  filter() {
    const filter = {};
    const status = this.filterGroup.get('status').value;
    if (status) {
      filter['status'] = status;
    }

    const type = this.filterGroup.get('type').value;
    if (type) {
      filter['type'] = type;
    }
    this._Thu_chiService.patchStatePayments({ filter }, this.apithuchi);
  }

  UpdateDuyet(id, vl) {
    let item =
    {
      status: vl
    }
    this._Thu_chiService.UpdateDuyet(id, item).subscribe(res => {
      this._Thu_chiService.patchStatePayments({}, this.apithuchi);
      this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
    })
  }
  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        /*
      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
      we are limiting the amount of server requests emitted to a maximum of one every 150ms
      */
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  saverange(value) {
    this.search(value)

  }
  reload() {
    this.search_date = "";
    const filter = {};
    this._Thu_chiService.patchStatePayments({ filter }, this.apithuchi);
  }
  search(value) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }
    if (value != "") {


      const filter = {};
      filter['datetime'] = value
      this._Thu_chiService.patchStatePayments({ filter }, this.apithuchi);
    }
    else {

      const filter = {};


      this._Thu_chiService.patchStatePayments({ filter }, this.apithuchi);
    }

  }


  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this._Thu_chiService.patchStatePayments({ sorting }, this.apithuchi);
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this._Thu_chiService.patchStatePayments({ paginator }, this.apithuchi);
  }

  // form actions
  create() {
    this.edit(undefined);
  }
  editchi(id) {
    const modalRef = this.modalService.open(UpdateChiComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this._Thu_chiService.patchStatePayments({}, this.apithuchi),
      () => { }
    );
    // 
  }
  edit(id: number) {
    const modalRef = this.modalService.open(CreatedChiComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this._Thu_chiService.patchStatePayments({}, this.apithuchi),
      () => { }
    );
  }


  delete(id) {
    const _title = this.translate.instant('Xóa Payment');
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
        this._Thu_chiService.deletePay(id).subscribe(res => {
          if (res) {
            this._Thu_chiService.patchStatePayments({}, this.apithuchi);
            this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }

  deleteSelected() {

    const _title = this.translate.instant('Xóa Plan');
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
        this.grouping.getSelectedRows().forEach(element => {

          this._Thu_chiService.deletePay(element).subscribe(res => {
            if (res) {
              this._Thu_chiService.patchStatePayments({}, this.apithuchi);
            }

          })
        });

        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 400000000, true, false, 3000, 'top', 1);

      }

    });
  }

  updateStatusForSelected() {
    const modalRef = this.modalService.open(UpdateCustomersStatusModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(() => this._Thu_chiService.fetch(), () => { });
  }

  fetchSelected() {
    const modalRef = this.modalService.open(FetchCustomersModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(() => this._Thu_chiService.fetch(), () => { });
  }
}

