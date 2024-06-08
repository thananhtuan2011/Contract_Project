import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';
import { ThuChiService } from 'src/app/pages/Thu_Chi/thuchi.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
})
export class Dashboard1Component implements OnInit {
  selected_re: any = "2024"
  selected_ex: any = "2024"
  selected_re1: any = "2024"
  selected_re2: any = "2024"
  ThangBieudo_Default = [
    { name: '1', value: 0 },
    { name: '2', value: 0 },
    { name: '3', value: 0 },
    { name: '4', value: 0 },
    { name: '5', value: 0 },
    { name: '6', value: 0 },
    { name: '7', value: 0 },
    { name: '8', value: 0 },
    { name: '9', value: 0 },
    { name: '10', value: 0 },
    { name: '11', value: 0 },
    { name: '12', value: 0 },
    { name: 'Total', value: 0 },
  ];
  ThangBieudo = [
    { name: '1', value: 0 },
    { name: '2', value: 0 },
    { name: '3', value: 0 },
    { name: '4', value: 0 },
    { name: '5', value: 0 },
    { name: '6', value: 0 },
    { name: '7', value: 0 },
    { name: '8', value: 0 },
    { name: '9', value: 0 },
    { name: '10', value: 0 },
    { name: '11', value: 0 },
    { name: '12', value: 0 },
    { name: 'Total', value: 0 },
  ];
  ThangBieudoChi = [
    { name: '1', value: 0 },
    { name: '2', value: 0 },
    { name: '3', value: 0 },
    { name: '4', value: 0 },
    { name: '5', value: 0 },
    { name: '6', value: 0 },
    { name: '7', value: 0 },
    { name: '8', value: 0 },
    { name: '9', value: 0 },
    { name: '10', value: 0 },
    { name: '11', value: 0 },
    { name: '12', value: 0 },
    { name: 'Total', value: 0 },
  ];
  ThangBieudo_real = [
    { name: '1', value: 0 },
    { name: '2', value: 0 },
    { name: '3', value: 0 },
    { name: '4', value: 0 },
    { name: '5', value: 0 },
    { name: '6', value: 0 },
    { name: '7', value: 0 },
    { name: '8', value: 0 },
    { name: '9', value: 0 },
    { name: '10', value: 0 },
    { name: '11', value: 0 },
    { name: '12', value: 0 },
    { name: 'Total', value: 0 },
  ];
  ThangBieudoChi_real = [
    { name: '1', value: 0 },
    { name: '2', value: 0 },
    { name: '3', value: 0 },
    { name: '4', value: 0 },
    { name: '5', value: 0 },
    { name: '6', value: 0 },
    { name: '7', value: 0 },
    { name: '8', value: 0 },
    { name: '9', value: 0 },
    { name: '10', value: 0 },
    { name: '11', value: 0 },
    { name: '12', value: 0 },
    { name: 'Total', value: 0 },
  ];
  single2: any[] = [];
  single2_chi: any[] = [];
  single2_real: any[] = [];
  single2_chi_real: any[] = [];
  multi: any[] = [];
  multi_chi: any[] = []

  multi_real: any[] = [];
  multi_chi_real: any[] = []

  view: any[] = [595, 330];
  // options
  listYear: any[] = [
    {
      value: "2024"
    },
    {
      value: "2025"
    },
    {
      value: "2026"
    },
    {
      value: "2027"
    },
    {
      value: "2028"
    },
    {
      value: '2029'
    },
    {
      value: '2030'
    }

  ]
  showXAxis = true;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel_chi = 'Expenditure planning chart';
  xAxisLabel = 'Revenue planning chart';
  xAxisLabel_chi_real = 'Expenditure  chart';
  xAxisLabel_real = 'Revenue  chart';
  showYAxisLabel = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', 'red', '#E0115F', '#007BA7', '#40826D', '#FF00AF', '#FF4500', '#808000', '#FF007F ', '7AA454']
  };
  colorScheme_Chi = {
    domain: [
      "#0000FF",
      "#154360",
      "#17202A",
      "#21618C",
      "#2E86C1",
      "#85C1E9",
      "#2E86C1",
      "#34495E",
      "#21618C",
      '#5AA454',
      '#A10A28',
      '#A10A23',
      "#154360"
    ]
  };
  colorScheme_real = {
    domain: ['#DC143C', '#A10A21', '#C7B42V', '#AAAAA4', 'red', '#E0115F', '#007BA7', '#40826D', '#FF00AF', '#FF4500', '#808000', '#FF007F ', '#20B2AA']
  };
  colorScheme_Chi_real = {
    domain: [
      "#FF8C00",
      "#154340",
      "#17202A",
      "#21418C",
      "#2E86C1",
      "#85C1E9",
      "#2E8621",
      "#34295E",
      "#21618C",
      '#5AA454',
      '#A10A28',
      '#A10A23',
      "#FF1493"
    ]
  };
  verticalBarOptions = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showGridLines: true,
    barPadding: 25,
    showXAxisLabel: false,
    xAxisLabel: "Country",
    showYAxisLabel: true,
    yAxisLabel: "Sales"
  };

  constructor(public _thuchi_serices: ThuChiService, private changeDetectorRefs: ChangeDetectorRef) {

    this.LoadData(this.selected_re);
    this.LoadData_Chi(this.selected_ex);
    this.LoadDataThu_ThucTe(this.selected_re1);
    this.LoadData_Chi_ThucTe(this.selected_re2);
  }

  LoadData(year) {
    this.ThangBieudo = this.ThangBieudo_Default.slice()
    let total: number = 0
    this.multi = []
    this._thuchi_serices.GetChartPlanThu(null, year).subscribe(res => {
      res.forEach(element => {
        total = total + Number.parseInt(element.value)
        let itt = {
          name: element.name.toString(),
          value: Number.parseInt(element.value)
        }
        this.multi.push(itt)
      });
      this.ThangBieudo.forEach(x => {
        let index = this.multi.findIndex(k => k.name == x.name);
        let index2 = this.ThangBieudo.findIndex(h => h.name == x.name);
        if (index >= 0) {
          this.ThangBieudo.splice(index2, 1, this.multi[index])
        }
      })
      let totalall = {
        name: 'Total',
        value: total
      }

      this.ThangBieudo.splice(12, 1, totalall)

      // console.log("ThangBieudo", this.ThangBieudo)
      this._thuchi_serices.Bieudo.next(this.ThangBieudo)


    })
  }
  LoadDataThu_ThucTe(year) {
    this.ThangBieudo_real = this.ThangBieudo_Default.slice()
    let total: number = 0
    this.multi_real = []
    this._thuchi_serices.GetChartPlanThu_ThucTe(null, year).subscribe(res => {
      console.log("GetChartPlanThu_ThucTe", res)
      res.forEach(element => {
        total = total + Number.parseInt(element.value)
        let itt = {
          name: element.name.toString(),
          value: Number.parseInt(element.value)
        }
        this.multi_real.push(itt)
      });
      this.ThangBieudo_real.forEach(x => {
        let index = this.multi_real.findIndex(k => k.name == x.name);
        let index2 = this.ThangBieudo_real.findIndex(h => h.name == x.name);
        if (index >= 0) {
          this.ThangBieudo_real.splice(index2, 1, this.multi_real[index])
        }
      })
      let totalall = {
        name: 'Total',
        value: total
      }

      this.ThangBieudo_real.splice(12, 1, totalall)
      this._thuchi_serices.Bieudo_real.next(this.ThangBieudo_real)


    })
  }
  LoadData_Chi_ThucTe(year) {
    this.ThangBieudoChi_real = this.ThangBieudo_Default.slice()
    this.multi_chi_real = []
    let totalchi: number = 0
    this._thuchi_serices.GetChartPlanChi_ThucTe(null, year).subscribe(res => {
      if (res.paycount == 0) {
        this._thuchi_serices.Bieudo_chi_real.next(this.ThangBieudoChi_real)
      }
      else {

        res.forEach(element => {

          totalchi = totalchi + Number.parseInt(element.value)
          let itt = {
            name: element.name.toString(),
            value: Number.parseInt(element.value)
          }
          this.multi_chi_real.push(itt)
          // this.single2.push(itt)
        });
        this.ThangBieudoChi_real.forEach(x => {
          let index = this.multi_chi_real.findIndex(k => k.name == x.name);
          let index2 = this.ThangBieudoChi_real.findIndex(h => h.name == x.name);
          if (index >= 0) {
            this.ThangBieudoChi_real.splice(index2, 1, this.multi_chi_real[index])
          }
        })
        let totalall = {
          name: 'Total',
          value: totalchi
        }

        this.ThangBieudoChi_real.splice(12, 1, totalall)


        this._thuchi_serices.Bieudo_chi_real.next(this.ThangBieudoChi_real)

      }

    })
  }
  LoadData_Chi(year) {
    this.ThangBieudoChi = this.ThangBieudo_Default.slice()
    this.multi_chi = []
    let totalchi: number = 0
    this._thuchi_serices.GetChartPlanChi(null, year).subscribe(res => {
      res.forEach(element => {

        totalchi = totalchi + Number.parseInt(element.value)
        let itt = {
          name: element.name.toString(),
          value: Number.parseInt(element.value)
        }
        this.multi_chi.push(itt)
        // this.single2.push(itt)
      });
      this.ThangBieudoChi.forEach(x => {
        let index = this.multi_chi.findIndex(k => k.name == x.name);
        let index2 = this.ThangBieudoChi.findIndex(h => h.name == x.name);
        if (index >= 0) {
          this.ThangBieudoChi.splice(index2, 1, this.multi_chi[index])
        }
      })
      let totalall = {
        name: 'Total',
        value: totalchi
      }

      this.ThangBieudoChi.splice(12, 1, totalall)


      this._thuchi_serices.Bieudo_chi.next(this.ThangBieudoChi)


    })
  }
  ngOnInit(): void {
    this._thuchi_serices.Bieudo.subscribe(res => {
      this.single2 = res;
      // this.changeDetectorRefs.detectChanges();
    })
    this._thuchi_serices.Bieudo_chi.subscribe(res => {
      this.single2_chi = res;
      // this.changeDetectorRefs.detectChanges();
    })

    this._thuchi_serices.Bieudo_real.subscribe(res => {
      this.single2_real = res;
      // this.changeDetectorRefs.detectChanges();
    })
    this._thuchi_serices.Bieudo_chi_real.subscribe(res => {
      this.single2_chi_real = res;
      // this.changeDetectorRefs.detectChanges();
    })

  }
  onSelect(event) {
    console.log(event);
  }

  onDepartmentSelectionRe() {
    this.LoadData(this.selected_re);
  }
  onDepartmentSelection() {
    this.LoadData_Chi(this.selected_ex);
  }
  onDepartmentSelectionRe__thu_real() {
    this.LoadDataThu_ThucTe(this.selected_re1);
  }
  onDepartmentSelection__chireal() {
    this.LoadData_Chi_ThucTe(this.selected_re2);
  }

}
