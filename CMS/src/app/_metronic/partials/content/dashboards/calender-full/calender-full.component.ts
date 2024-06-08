import { MatDialog } from '@angular/material/dialog';
import { ThuChiService } from './../../../../../pages/Thu_Chi/thuchi.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EventClickArg, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { of } from 'rxjs';
import { OpenDetailComponent } from './open-detail/open-detail.component';
@Component({
  selector: 'app-calender-full',
  templateUrl: './calender-full.component.html',
  styleUrls: ['./calender-full.component.scss']
})
export class CalenderFullComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];
  listAllThu: any[] = []
  listData: any[] = []
  listOpen: any[] = []
  public calendarOptions: any

  constructor(private _thu_chi: ThuChiService, private dialog: MatDialog, private cdr: ChangeDetectorRef,) {

    this.GetAllThu();
    // this.calendarOptions.events = [{
    //   start
    //     :
    //     "2024-02-13T09:23:39.000Z",
    //   title
    //     :
    //     "THUHD"
    // }]
  }
  GetAllThu() {
    this.listData = []
    this.listOpen = []
    let body = {
      "filter": {

      },
      "paginator": {
        "total": 0,
        "totalpage": 0,
        "page": 1,
        "pageSize": 10000,
        "pageSizes": [
          0
        ]
      },

      "sorting": {

      }
    }
    this._thu_chi.getAllThu(body).subscribe(res => {
      this.listAllThu = res.data;
      this.listAllThu.forEach(element => {
        let item = {
          idplan_thu: element.idplan_,
          title: element.id_code,
          start: element.pay_date,

        }

        this.listData.push(item)
        // this.calendarOptions.events.push(item)






      });

      this._thu_chi.getAllChi(body).subscribe(chi => {
        chi.data.forEach(element => {

          let item = {
            idplan_chi: element.idplan_,
            title: element.idexpenses,
            start: element.pay_date,

          }

          this.listData.push(item)



          // this.calendarOptions.events.push(item)






        });
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          dateClick: this.handleDateClick.bind(this),
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          },
          events: this.listData,

        };
      })

    })

    // console.log("this.listData", this.listData)
    // this.calendarOptions.events = this.listData
    // this.cdr.detectChanges();
  }
  // public fetchEvents() {
  //   return this._thu_chi.getFullDate().toPromise();
  // }
  ngOnInit(): void {
    // this.GetAllThu();
  }
  handleDateClick(arg) {

    let dt = this.listData.filter(x => moment(new Date(x.start)).format('YYYY-MM-DD') == arg.dateStr)
    console.log(" sau fillter", dt)



    const dialogRef = this.dialog.open(OpenDetailComponent,
      {
        // width: '600px',
        data: { dt },
        // with:'500px',

        // panelClass:'no-padding'

      });
    dialogRef.afterClosed().subscribe(res => {

    })

    // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //   this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
    //     title: 'New Event',
    //     start: arg.date,
    //     allDay: arg.allDay
    //   })
    // }
  }

  // public fetchEvents(dateInfo) {
  //   return this.events.get(dateInfo.start, dateInfo.end).toPromise();
  // }
}
