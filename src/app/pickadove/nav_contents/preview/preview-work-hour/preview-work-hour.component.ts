import { Component, OnInit, Input } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface Schedule{
  isPmFrom: string,
  isPmTo: string,
  w_day: string,
  w_from: number,
  w_to: number
}

@Component({
  selector: 'app-preview-work-hour',
  templateUrl: './preview-work-hour.component.html',
  styleUrls: ['./preview-work-hour.component.css']
})
export class PreviewWorkHourComponent implements OnInit {

  
  week = [{id: 0, name: 'SUN'},{id: 1, name: 'MON'},{id: 2, name: 'TUE'},{id: 3, name: 'WED'},{id: 4, name: 'THU'},{id: 5, name: 'FRI'},{id:6, name: 'SAT'}]
  hour = [{id: 1, name: '1'},{id: 2, name: '2'},{id: 3, name: '3'},{id: 4, name: '4'},{id: 5, name: '5'},{id: 6, name: '6'},{id: 7, name: '7'},{id: 8, name: '8'},{id: 9, name: '9'},{id: 10, name: '10'},{id: 11,  name: '11'},{id: 12, name: '12'}]
  timeFormat = [{id: 0, name: 'AM'}, {id: 1, name: 'PM'}]

  workHours: Array<Schedule> = [];

  constructor(private exchangeService: DataExchangeService, private userService: UsersService, private router: Router) { }

  ngOnInit() {
    setTimeout (() => {
      this.exchangeService.setLoading(true);
     }, 100);
    this.userService.getWorkHours(localStorage.getItem('user_id'), localStorage.getItem('token'), (hours) => {
      if(hours.success == 0){
        return
      } else if(hours.success == -1){
        this.router.navigate['sign']
      }
      hours.data.forEach((element : Schedule) => {
        var schedule={
          isPmFrom: this.timeFormat[element.isPmFrom].name,
          isPmTo: this.timeFormat[element.isPmTo].name,
          w_day: this.week[element.w_day].name,
          w_from: element.w_from,
          w_to: element.w_to
        }
        this.workHours.push(schedule);
      });
      setTimeout (() => {
        this.exchangeService.setLoading(false);
    }, 1000);
    })
  }

}
