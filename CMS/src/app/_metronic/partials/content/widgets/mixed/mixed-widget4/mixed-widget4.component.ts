import { ThuChiService } from 'src/app/pages/Thu_Chi/thuchi.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-mixed-widget4',
  templateUrl: './mixed-widget4.component.html',
})
export class MixedWidget4Component implements OnInit {
  single2_chi: any[] = [];
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
  ];
  selected: any = "2024"
  total: number = 0;
  total_thucte: number = 0
  per: number;
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
  view: any[] = [1300, 500];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Revenue comparison chart';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;
  chartOptions: any = {};
  multi: any[] = []
  multi_thucte: any[] = []
  data: any[] = []
  data_thucte: any[] = []
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
  ];
  ThangBieudoThucTe = [
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

  ];
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  @Input() cssClass;

  constructor(private layout: LayoutService, private _thuchi_serices: ThuChiService, private changeDetectorRefs: ChangeDetectorRef) {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.colorsGrayGray500 = this.layout.getProp('js.colors.gray.gray500');
    this.colorsGrayGray200 = this.layout.getProp('js.colors.gray.gray200');
    this.colorsGrayGray300 = this.layout.getProp('js.colors.gray.gray300');
    this.colorsThemeBaseDanger = this.layout.getProp(
      'js.colors.theme.base.danger'
    );
  }
  LoadData(year) {
    this.ThangBieudo = this.ThangBieudo_Default.slice()
    this.multi = []
    this.total = 0
    this.data = []
    this._thuchi_serices.GetChartPlanThu(null, year).subscribe(res => {
      res.forEach(element => {
        this.total = this.total + Number.parseInt(element.value)
        let itt = {
          name: element.name.toString(),
          value: Number.parseInt(element.value)
        }
        this.multi.push(itt)
        // this.single2.push(itt)
      });
      this.ThangBieudo.forEach(x => {
        let index = this.multi.findIndex(k => k.name == x.name);
        let index2 = this.ThangBieudo.findIndex(h => h.name == x.name);
        if (index >= 0) {
          this.ThangBieudo.splice(index2, 1, this.multi[index])
        }
      })
      this.ThangBieudo.forEach(element => {
        this.data.push(element.value)
      });
      // this.ThangBieudo.splice(12, 1, totalall)
      // this._thuchi_serices.Bieudo.next(this.ThangBieudo)


      // console.log(" this.single2", this.single2)
    })
  }
  LoadDataThucTe(year) {
    this.ThangBieudoThucTe = this.ThangBieudo_Default.slice()
    this.multi_thucte = []
    this.data_thucte = []
    this.total_thucte = 0
    this._thuchi_serices.GetChartPlanThu_ThucTe(null, year).subscribe(res => {
      res.forEach(element => {
        this.total_thucte = this.total_thucte + Number.parseInt(element.value)
        let itt = {
          name: element.name.toString(),
          value: Number.parseInt(element.value)
        }
        this.multi_thucte.push(itt)
        // this.single2.push(itt)
      });
      this.ThangBieudoThucTe.forEach(x => {
        let index = this.multi_thucte.findIndex(k => k.name == x.name);
        let index2 = this.ThangBieudoThucTe.findIndex(h => h.name == x.name);
        if (index >= 0) {
          this.ThangBieudoThucTe.splice(index2, 1, this.multi_thucte[index])
        }
      })


      this.ThangBieudoThucTe.forEach(element => {
        this.data_thucte.push(element.value)
      });

      // this.ThangBieudo.splice(12, 1, totalall)
      // this._thuchi_serices.Bieudo.next(this.ThangBieudo)


      // console.log(" this.single2", this.single2)
    })
  }
  onDepartmentSelectionRe() {
    this.LoadData(this.selected);
    this.LoadDataThucTe(this.selected)
    setTimeout(() => {
      this.MapDataTwoTable()
      // this.per = (this.total_thucte / this.total) * 100
      // console.log(" this.per", this.per)
    }, 1000);
  }
  datafinal: any[] = []
  MapDataTwoTable() {
    this.datafinal = []
    this.ThangBieudoThucTe.forEach(element1 => {
      this.ThangBieudo.forEach(element => {
        if (element1.name == element.name) {
          let item = {
            name: element1.name,
            series: [
              {
                name: "Reality",
                value: element1.value,
              },
              {
                name: "Plan",
                value: element.value,
              }
            ]
          }
          this.datafinal.push(item)
        }
      });
    });

    this._thuchi_serices.sosanh_thu.next(this.datafinal)

  }
  ngOnInit(): void {
    this.chartOptions = this.getChartOptions();
    this.LoadData(this.selected);
    this.LoadDataThucTe(this.selected);
    setTimeout(() => {
      this.MapDataTwoTable()
      // this.per = (this.total_thucte / this.total) * 100
      // console.log(" this.per", this.per)
    }, 1000);
    this._thuchi_serices.sosanh_thu.subscribe(res => {
      this.single2_chi = res;
      this.changeDetectorRefs.detectChanges();
    })
  }

  getChartOptions() {
    const strokeColor = '#D13647';
    return {
      series: [{
        name: 'Net Profit',
        data: this.data
      }, {
        name: 'Revenue',
        data: this.data_thucte
      }],
      chart: {
        type: 'bar',
        height: '200px',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: ['30%'],
          endingShape: 'rounded'
        },
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      fill: {
        type: ['solid', 'solid'],
        opacity: [0.25, 1]
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily
        },
        y: {
          formatter: (val) => {
            return `$ ${val}  thousands`;
          }
        },
        marker: {
          show: false
        }
      },
      colors: ['#ffffff', '#ffffff'],
      grid: {
        borderColor: this.colorsGrayGray200,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          left: 20,
          right: 20
        }
      }
    };
  }
  public multidatatest = [{
    "name": "thuc1",
    "series": [
      {
        "name": "1",
        "value": 0
      },
      {
        "name": "1",
        "value": 5888883
      }
    ]
  },]
  public multidata = [
    {
      "name": "China",
      "series": [
        {
          "name": "2018",
          "value": 2243772
        },
        {
          "name": "2017",
          "value": 1227770
        }
      ]
    },
    {
      "name": "USA",
      "series": [
        {
          "name": "2018",
          "value": 1126000
        },
        {
          "name": "2017",
          "value": 764666
        }
      ]
    },
    {
      "name": "Norway",
      "series": [
        {
          "name": "2018",
          "value": 296215
        },
        {
          "name": "2017",
          "value": 209122
        }
      ]
    },
    {
      "name": "Japan",
      "series": [
        {
          "name": "2018",
          "value": 257363
        },
        {
          "name": "2017",
          "value": 205350
        }
      ]
    },
    {
      "name": "Germany",
      "series": [
        {
          "name": "2018",
          "value": 196750
        },
        {
          "name": "2017",
          "value": 129246
        }
      ]
    },
    {
      "name": "France99",
      "series": [
        {
          "name": "2018",
          "value": 204617
        },
        {
          "name": "2017",
          "value": 149797
        }
      ]
    },
    {
      "name": "China555",
      "series": [
        {
          "name": "2018",
          "value": 2243772
        },
        {
          "name": "2017",
          "value": 1227770
        }
      ]
    },
    {
      "name": "USA444",
      "series": [
        {
          "name": "2018",
          "value": 1126000
        },
        {
          "name": "2017",
          "value": 764666
        }
      ]
    },
    {
      "name": "Norway222",
      "series": [
        {
          "name": "2018",
          "value": 296215
        },
        {
          "name": "2017",
          "value": 209122
        }
      ]
    },
    {
      "name": "Japa444n",
      "series": [
        {
          "name": "2018",
          "value": 257363
        },
        {
          "name": "2017",
          "value": 205350
        }
      ]
    },
    {
      "name": "Germany222",
      "series": [
        {
          "name": "2018",
          "value": 196750
        },
        {
          "name": "2017",
          "value": 129246
        }
      ]
    },
    {
      "name": "France2222",
      "series": [
        {
          "name": "2018",
          "value": 204617
        },
        {
          "name": "2018",
          "value": 149797
        }
      ]
    }
  ];
}
