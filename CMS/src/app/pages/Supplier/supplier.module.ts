import { LayoutUtilsService } from '../../modules/auth/crud/utils/layout-utils.service';
import { CRUDTableModule } from '../../_metronic/shared/crud-table/crud-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier/supplier.component';
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
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { UpdateSuppierComponent } from './supplier/update-suppier/update-suppier.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    SupplierComponent,
    AddSupplierComponent,
    UpdateSuppierComponent,],
  entryComponents: [UpdateSuppierComponent],
  imports: [
    MatIconModule,
    PerfectScrollbarModule,
    InlineSVGModule,
    NgbModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    FormsModule,
    MatTabsModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CRUDTableModule,
    RouterModule.forChild([



      {
        path: 'list',
        component: SupplierComponent,
      },

    ]),
  ],
  providers: [LayoutUtilsService]
})
export class SupplierModule { }
