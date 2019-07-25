import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';

declare var $:any;


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navs = [
    {id: 'nav0', name: "PREVIEW", active: false},
    {id: 'nav1', name: "EDIT", active: false}, 
    {id: 'nav2', name: "PAYMENT", active: false}
  ];

  @Output() selection = new EventEmitter<any>();

  constructor(private exchangeService: DataExchangeService, private userService: UsersService) { }

  ngOnInit() {
    this.exchangeService.userStatus.subscribe(status => {
      this.selectNav(status);
    })
  }

  selectNav(id){
    // $("#"+id).addClass("active");
    // $('#navbarNav').removeClass("show");
    // this.navs.forEach(nav => {
    //   if(id != nav.id){
    //     $('#'+nav.id).removeClass("active");
    //   }
    // });

    this.navs = [
      {id: 'nav0', name: "PREVIEW", active: false},
      {id: 'nav1', name: "EDIT",active: false}, 
      {id: 'nav2', name: "PAYMENT", active: false}
    ];
    switch(id){
      case 'nav0':
        this.navs[0].active = true;
        break;
      case 'nav1':
        this.navs[1].active = true;
        break;
      case 'nav2':
        this.navs[2].active = true;
        break;
    }
    this.selection.emit(id);
  }
}
