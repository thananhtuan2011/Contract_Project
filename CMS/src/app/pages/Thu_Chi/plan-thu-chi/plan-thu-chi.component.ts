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
import { AddPlanChiComponent } from '../add-plan-chi/add-plan-chi.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-thu-chi',
  templateUrl: './plan-thu-chi.component.html',
  styleUrls: ['./plan-thu-chi.component.scss']
})

export class PlanThuChiComponent
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
  apithuchi = this.api + "/api/thuchi/getAllThu"
  apichi = this.api + "/api/thuchi/getAllChi"
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private modalService: NgbModal,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    public _Thu_chiService: ThuChiService
  ) { }
  filterForm(): void {
    throw new Error('Method not implemented.');
  }
  filter(): void {
    throw new Error('Method not implemented.');
  }
  searchForm(): void {
    throw new Error('Method not implemented.');
  }
  search(searchTerm: string): void {
    throw new Error('Method not implemented.');
  }
  sort(column: string): void {
    throw new Error('Method not implemented.');
  }
  updateStatusForSelected(): void {
    throw new Error('Method not implemented.');
  }
  fetchSelected(): void {
    throw new Error('Method not implemented.');
  }
  deleteSelected(): void {
    throw new Error('Method not implemented.');
  }
  edit(id: number): void {
    throw new Error('Method not implemented.');
  }
  delete(id: number): void {
    throw new Error('Method not implemented.');
  }
  create(): void {
    throw new Error('Method not implemented.');
  }

  // angular lifecircle hooks
  ngOnInit(): void {

    this.router.navigate(['/Planning/plan/Rev-Plan']);
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



}

