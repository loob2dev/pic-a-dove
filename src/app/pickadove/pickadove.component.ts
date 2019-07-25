import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from '../service/data-exchange.service';
import { MapsService } from '../maps.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-pickadove',
  templateUrl: './pickadove.component.html',
  styleUrls: ['./pickadove.component.css']
})
export class PickadoveComponent implements OnInit {

  title = 'Pick-a-dove';
  verfication = false;
  isVerified = false;
  started = false;

  ocation: Object;
  
  constructor(private exchangeService: DataExchangeService, private router: Router) { }
    
  ngOnInit(): void{ 
    setTimeout (() => {
      this.started = true;
    }, 2000)
    $(document).ready(()=> {
      $('.sign').css("margin-left", ($(window).width() - $('.sign').width())/2);
    });
    $(window).resize(function(){
      $('.sign').css("margin-left", ($(window).width() - $('.sign').width())/2);
    });
    
    this.exchangeService.tokenObserver.subscribe((broken)=>{
     if(broken){
      this.verfication = false;
      this.isVerified = false;
      this.started = true;
      this.exchangeService.goTosign(false);
     } 
    })
    var status = localStorage.getItem('status');
    switch(status){
      case '-1':
        this.router.navigate['sign'];
        break;
      case '0':
        this.router.navigate['verification'];
        break
      case '1':
        this.exchangeService.changeUserStatus("nav1");
        break
      case '2':
        this.exchangeService.changeUserStatus("nav0");
    }
  }
}
