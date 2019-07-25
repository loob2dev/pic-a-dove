import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  details: any;

  constructor(private exchangeService: DataExchangeService, private userservice: UsersService) { }

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
      if(details.success){
        this.details = details.data;
        try {
          var phone_hidden_number = this.details.contact_mobile.substring(0, 3) + "XXXX"; 
          this.details.contact_mobile_unreveal = phone_hidden_number;
        } catch (error) {
          
        }
        setTimeout (() => {
          this.exchangeService.setLoading(false);
        }, 1000);
      }
    });
  }

}