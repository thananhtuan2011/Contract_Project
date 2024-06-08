import { CalenderFullRealityComponent } from '../../_metronic/partials/content/dashboards/calender-full-reality/calender-full-reality.component';
import { CalenderFullComponent } from '../../_metronic/partials/content/dashboards/calender-full/calender-full.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadCalenderComponent } from './load-calender.component';

const routes: Routes = [

  // {
  // path: '',
  // component: LoadCalenderComponent,
  // children: [

  {
    path: 'plan',
    component: CalenderFullComponent,
  },
  {
    path: 'reality',
    component: CalenderFullRealityComponent,
  }
  // ]
  // }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
