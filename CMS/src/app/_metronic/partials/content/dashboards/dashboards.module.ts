import { ThuChiService } from './../../../../pages/Thu_Chi/thuchi.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalenderFullComponent } from './calender-full/calender-full.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CalenderFullRealityComponent } from './calender-full-reality/calender-full-reality.component';
import { OpenDetailComponent } from './calender-full/open-detail/open-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { OpenRealityComponent } from './calender-full-reality/open-reality/open-reality.component';
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [Dashboard1Component, Dashboard2Component, DashboardWrapperComponent, Dashboard3Component, CalenderFullComponent, CalenderFullRealityComponent, OpenDetailComponent, OpenRealityComponent],
  imports: [CommonModule, WidgetsModule, MatCardModule, MatDialogModule, FullCalendarModule, MatFormFieldModule, FormsModule, NgxChartsModule, MatSelectModule],
  exports: [DashboardWrapperComponent, CalenderFullComponent, CalenderFullRealityComponent],
  providers: [ThuChiService]
})
export class DashboardsModule { }
