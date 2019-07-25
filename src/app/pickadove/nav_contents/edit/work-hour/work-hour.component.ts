import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatMonthView } from '@angular/material';
import { DataExchangeService } from 'src/app/service/data-exchange.service';

interface Schedule{
  id_user: any,
  id_workhours: any,
  isPmFrom: any,
  isPmTo: any,
  w_day: any,
  w_from: any,
  w_to: any
}

@Component({
  selector: 'app-work-hour',
  templateUrl: './work-hour.component.html',
  styleUrls: ['./work-hour.component.css']
})
export class WorkHourComponent implements OnInit {

  // weekSelectedFrom = 'MON';
  // hourSelectedFrom = '1';
  // formatSeletFrom = 'AM';
  // weekSelectedTo = 'MON';
  // hourSelectedTo = '12';
  // formatSeletTo = 'PM';
  @Input()workSchedule:Schedule[];

  @Output() workHour = new EventEmitter();

  week = [{id: 0, name: 'SUN'},{id: 1, name: 'MON'},{id: 2, name: 'TUE'},{id: 3, name: 'WED'},{id: 4, name: 'THU'},{id: 5, name: 'FRI'},{id:6, name: 'SAT'}]
  hour = [{id: 1, name: '1'},{id: 2, name: '2'},{id: 3, name: '3'},{id: 4, name: '4'},{id: 5, name: '5'},{id: 6, name: '6'},{id: 7, name: '7'},{id: 8, name: '8'},{id: 9, name: '9'},{id: 10, name: '10'},{id: 11,  name: '11'},{id: 12, name: '12'}]
  timeFormat = [{id: 0, name: 'AM'}, {id: 1, name: 'PM'}]

  arryHours : any = [];

  constructor(private dataExchange: DataExchangeService) { }

  ngOnInit() {}

  addHour(){
    var schedule = {
      id_user: localStorage.getItem('user_id'),
      id_workhours: this.workSchedule.length,
      isPmFrom: 0,
      isPmTo: 1,
      w_day: 1,
      w_from: 1,
      w_to: 12
    };
    this.workSchedule.push(schedule);
  }

}
