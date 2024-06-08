
import { LayoutUtilsService } from '../../modules/auth/crud/utils/layout-utils.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRUDTableModule } from '../../_metronic/shared/crud-table/crud-table.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AvatarModule } from 'ngx-avatar';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DanhmucThuComponent } from './danhmuc-thu/danhmuc-thu.component';
import { DanhmucChiComponent } from './danhmuc-chi/danhmuc-chi.component';
import { PlanThuChiComponent } from './plan-thu-chi/plan-thu-chi.component';
import { AddPlanThuChiComponent } from './add-plan-thu-chi/add-plan-thu-chi.component';
import { ListThuChiComponent } from './list-thu-chi/list-thu-chi.component';
import { LoadThuComponent } from './load-thu/load-thu.component';
import { LoadChiComponent } from './load-chi/load-chi.component';
import { LoadCongNoComponent } from './load-cong-no/load-cong-no.component';
import { CreatedThuComponent } from './created-thu/created-thu.component';
import { CreatedChiComponent } from './created-chi/created-chi.component';
import { CreadCongNoComponent } from './cread-cong-no/cread-cong-no.component';
import { CreatedHoaDonCongNoComponent } from './created-hoa-don-cong-no/created-hoa-don-cong-no.component';
import { UpdateHoaDonCongNoComponent } from './update-hoa-don-cong-no/update-hoa-don-cong-no.component';
import { UpdateThuComponent } from './update-thu/update-thu.component';
import { UpdateChiComponent } from './update-chi/update-chi.component';
import { AddPlanChiComponent } from './add-plan-chi/add-plan-chi.component';
import { LoadChiPlanComponent } from './load-chi-plan/load-chi-plan.component';
import { LoadThuPlanComponent } from './load-thu-plan/load-thu-plan.component';
import { CreatedDanhmucThuComponent } from './created-danhmuc-thu/created-danhmuc-thu.component';
import { CreatedDanhmucChiComponent } from './created-danhmuc-chi/created-danhmuc-chi.component';
import { UpdateDanhmucThuComponent } from './update-danhmuc-thu/update-danhmuc-thu.component';
import { UpdateDanhmucChiComponent } from './update-danhmuc-chi/update-danhmuc-chi.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    LoadCongNoComponent,
    LoadChiComponent,
    LoadThuComponent,
    DanhmucThuComponent,
    DanhmucChiComponent,
    PlanThuChiComponent,
    AddPlanThuChiComponent,
    ListThuChiComponent,
    CreatedThuComponent,
    CreatedChiComponent,
    CreadCongNoComponent,
    CreatedHoaDonCongNoComponent,
    UpdateHoaDonCongNoComponent,
    UpdateThuComponent,
    LoadThuPlanComponent,
    LoadChiPlanComponent,
    UpdateChiComponent,
    AddPlanChiComponent,
    CreatedDanhmucThuComponent,
    CreatedDanhmucChiComponent,
    UpdateDanhmucThuComponent,
    UpdateDanhmucChiComponent],
  imports: [
    NgxMaskModule.forRoot(),
    MatIconModule,
    PerfectScrollbarModule,
    InlineSVGModule,
    NgbModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    FormsModule,
    MatTabsModule,
    MatMenuModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    AvatarModule,
    ReactiveFormsModule,
    CRUDTableModule,
    RouterModule.forChild([

      {
        path: 'Collection',
        component: DanhmucThuComponent,
      },
      {
        path: 'Expense',
        component: DanhmucChiComponent,
      },
      {
        path: 'plan',
        component: PlanThuChiComponent,
        children: [
          { path: 'Rev-Plan', component: LoadThuPlanComponent },
          { path: 'Exp-Plan', component: LoadChiPlanComponent },
        ]
      },
      {
        path: 'RE',
        component: ListThuChiComponent,
        children: [
          { path: 'Rev', component: LoadThuComponent },
          { path: 'Exp', component: LoadChiComponent },
          { path: 'Debt', component: LoadCongNoComponent },
        ]
      },

      // {
      //   path: 'browse-contract',
      //   component: BrowseContractComponent,
      //   children: [
      //     { path: 'detail/:id', component: BrowseDetailComponent },


      //   ]
      // },

    ]),
  ],
  providers: [

    LayoutUtilsService]
})
export class ThuchiModule { }
