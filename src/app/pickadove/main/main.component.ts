import { Component, OnInit, NgModule, Input, ViewChild } from '@angular/core';

import { MDBBootstrapModule, FasDirective } from 'angular-bootstrap-md';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

declare var $:any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('FadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(500 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(500, style({opacity: 0})))
    ])
  ]
})
export class MainComponent implements OnInit {

  home=false;
  loading :boolean = false;

  username: string = "";

  states = [
    {id: 0, name: "SA", active: false},
    {id: 1, name: "VIC", active: false},
    {id: 2, name: "NSW", active: false},
    {id: 3, name: "QLD", active: false},
    {id: 4, name: "NT", active: false}, 
    {id: 5, name: "WA", active: false}, 
    {id: 6, name: "TAS", active: false},
  ];

  currentState="";

  contents = {
    'nav0': false,
    'nav1': true,
    'nav2': false
  }
  progress = false;

  live:boolean = false;

  imsUrl : string = "../../../assets/img/avatar.png";

  constructor(private exchangeService: DataExchangeService, private router: Router, private userservice: UsersService, private userService: UsersService) { }

  ngOnInit() {
    this.updateThumbnail();
    this.userservice.getLiveStatus(localStorage.getItem('user_id'), localStorage.getItem('token'), (res)=>{
      if(res.success == 1){
        this.live = res.data.islive;
      }else if(res.success == -1){
        this.router.navigate['sign']
      }

      this.exchangeService.usernameInitObserver.subscribe(username=>{
        this.username = username;
      })
    })

    this.exchangeService.userStatus.subscribe(status => {
      this.onSelect(status);
    })
    this.exchangeService.loadingObserver.subscribe(status => {
      this.loading = status;
    })

    $(window).scroll(function(){
      var scrollPos = $(document).scrollTop();
      if($(".space").height() > 0){
        $(".space").height(40 - scrollPos / 15);
      }
      if(scrollPos == 0){
        $(".space").animate({height: "40px"}, 300);
      }
    });

    this.exchangeService.changeThumbnailObserver.subscribe(change=>{
      if(change)
        this.updateThumbnail();
    })
  }

  updateThumbnail(){
    this.userservice.getProfileImage(localStorage.getItem('user_id'), localStorage.getItem('token'), localStorage.getItem('user_id'), (res)=>{
      if(res.success == 1){
        this.imsUrl = 'http://192.168.1.140:4000/' + res.data.imgurl;
      }else if(res.success == -1){
        this.router.navigate['sign']
      }
    })
  }

  selectState(id){
    $('#'+id).addClass("active");
    $('#navbarNav').removeClass("show");
    this.states.forEach(state => {
      if(id != state.id){
        $('#'+state.id).removeClass("active");
      }
    });
    this.currentState = $('#'+id).text();

    this.exchangeService.goSearch(this.currentState);
    this.home=true;
    this.exchangeService.openHomePage(true);
  }

  onSelect(id){
    this.contents = {
      'nav0': false,
      'nav1': false,
      'nav2': false
    }
    this.progress = false;
      switch(id){
        case 'nav0':
          this.contents.nav0 = true;
          break;
        case 'nav1':
          this.contents.nav1 = true;
          break;
        case 'nav2':
          this.contents.nav2 = true;
          break;
      }
  }
  openHome(){
    this.home=true;
    this.exchangeService.openHomePage(true);
    this.userService.getMyProfileDetails(localStorage.getItem('user_id'), localStorage.getItem('token'), (details)=> {
      if(details.success == 1){
        this.states.forEach(element => {
          if(details.data.locationInfo.state == element.name){
            var id = element.id;
            $('#'+id).addClass("active");
            $('#navbarNav').removeClass("show");
            this.states.forEach(state => {
              if(id != state.id){
                $('#'+state.id).removeClass("active");
              }
            });
            this.currentState = $('#'+id).text();
        
            this.exchangeService.goSearch(this.currentState);            
          }
        });
      } else if (details.success == -1){
        this.router.navigate['sign']
      }
    });

  }
  openView(){
    // this.exchangeService.changeUserStatus("nav0");
    
    var status = localStorage.getItem('status');
    switch(status){
      case '1':
        this.exchangeService.changeUserStatus("nav1");
        break
      case '2':
        this.exchangeService.changeUserStatus("nav0");
    }
    this.home=false;
  }
  openEdit(){
    this.exchangeService.changeUserStatus("nav1");
    this.home=false;
  }
  openPaymentView(){
    this.exchangeService.changeUserStatus("nav2");
    this.home=false;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['sign']);
  }
  changeLiveStatus(event){
    this.live = event;
  }
}
