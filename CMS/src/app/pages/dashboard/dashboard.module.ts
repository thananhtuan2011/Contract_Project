import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import { CashComponent } from './cash/cash.component';
import { BebComponent } from './beb/beb.component';

@NgModule({
  declarations: [DashboardComponent, CashComponent, BebComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'beb',
        component: BebComponent,
      },

      {
        path: 'cash',
        component: CashComponent,
      },

    ]),
    DashboardsModule,
  ],
})
export class DashboardModule { }
