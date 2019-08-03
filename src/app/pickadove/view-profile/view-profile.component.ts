import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';

interface Schedule{
  isPmFrom: string,
  isPmTo: string,
  w_day: string,
  w_from: number,
  w_to: number
}

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  week = [{id: 0, name: 'SUN'},{id: 1, name: 'MON'},{id: 2, name: 'TUE'},{id: 3, name: 'WED'},{id: 4, name: 'THU'},{id: 5, name: 'FRI'},{id:6, name: 'SAT'}]
  hour = [{id: 1, name: 1},{id: 2, name: 2},{id: 3, name: 3},{id: 4, name: 4},{id: 5, name: 5},{id: 6, name: 6},
          {id: 7, name: 7},{id: 8, name: 8},{id: 9, name: 9},{id: 10, name: 10},{id: 11,  name: 11},{id: 12, name: 12}]
  timeFormat = [{id: 0, name: 'AM'}, {id: 1, name: 'PM'}]

  details: any;
  workHours: any;

  constructor(private exchangeService: DataExchangeService, private userservice: UsersService,  private router: Router) { }

  ngOnInit() {
    this.exchangeService.viewProfileOpenObserver.subscribe(id => {
      if(id != ""){
        this.init();
        $(window).scrollTop(0);
      }      
    })
  }
  init(){
    setTimeout (() => {
      this.exchangeService.setLoading(true);
     }, 100);
    this.userservice.getProfileDetailsById(localStorage.getItem('user_id'), localStorage.getItem('token'), localStorage.getItem('view_id'), (details)=> {
      if(details.success == 1){
        this.details = details.data;
        console.log(this.details)
        try {
          var phone_hidden_number = this.details.contact_mobile.substring(0, 3) + "XXXX"; 
          this.details.contact_mobile_unreveal = phone_hidden_number;
        } catch (error) {
          
        }
        this.details.workhours.forEach((element : Schedule) => {
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
      } else if(details.success == -1){
        this.router.navigate['sign']
      }
    });
  }

}