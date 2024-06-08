import { ThuChiService } from './../../../../../../pages/Thu_Chi/thuchi.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-reality',
  templateUrl: './open-reality.component.html',
  styleUrls: ['./open-reality.component.scss']
})
export class OpenRealityComponent implements OnInit {
  objectThu: any[] = [];
  objectChi: any[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private crd: ChangeDetectorRef, private thuchi_services: ThuChiService) { }

  GetPlanById_Thu(id) {
    this.thuchi_services.GetRealityThuById(id).subscribe(res => {
      this.objectThu.push(res)
      // console.log("objectThu", this.objectThu)
      this.crd.detectChanges()
    })
  }
  GetPlanById_Chi(id) {
    this.thuchi_services.GetRealityChiById(id).subscribe(res => {
      this.objectChi.push(res)
      // console.log("objectChi", this.objectChi)
      this.crd.detectChanges()
    })
  }
  ngOnInit(): void {

    this.data.dt.forEach(element => {
      if (element.idplan_chi) {
        this.GetPlanById_Chi(element.idplan_chi)
      }
      else {
        this.GetPlanById_Thu(element.idplan_thu)
      }

    });
  }

}
