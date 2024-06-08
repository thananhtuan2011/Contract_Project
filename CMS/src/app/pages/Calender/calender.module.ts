import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
import { LoadCalenderComponent } from './load-calender.component';


@NgModule({
  declarations: [LoadCalenderComponent],
  imports: [
    DashboardsModule,
    CommonModule,
    CalenderRoutingModule
  ]
})
export class CalenderModule { }
