import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThuChiService } from 'src/app/pages/Thu_Chi/thuchi.service';

@Component({
  selector: 'app-open-detail',
  templateUrl: './open-detail.component.html',
  styleUrls: ['./open-detail.component.scss']
})
export class OpenDetailComponent implements OnInit {

  objectThu: any[] = [];
  objectChi: any[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private crd: ChangeDetectorRef, private thuchi_services: ThuChiService) { }

  GetPlanById_Thu(id) {
    this.thuchi_services.GetPlanById_Thu(id).subscribe(res => {
      this.objectThu.push(res)
      console.log("objectThu", this.objectThu)
      this.crd.detectChanges()
    })
  }
  GetPlanById_Chi(id) {
    this.thuchi_services.GetPlanById_Chi(id).subscribe(res => {
      this.objectChi.push(res)
      console.log("objectChi", this.objectChi)
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
