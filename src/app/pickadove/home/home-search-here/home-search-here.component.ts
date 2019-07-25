import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users.service';

interface SearchField{
  state: string
  name : string,
  ageFrom : string,
  ageTo : string,
  heightFrom : string,
  heightTo : string,
  location : string
}


@Component({
  selector: 'app-home-search-here',
  templateUrl: './home-search-here.component.html',
  styleUrls: ['./home-search-here.component.css']
})
export class HomeSearchHereComponent implements OnInit {

  @Input() fields : SearchField;

  services : []

  constructor(private userservice: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userservice.getGirlsService(localStorage.getItem('user_id'), localStorage.getItem('token'), (services)=> {
      if(!services.success){
        return;
      }
      this.services = services.data;
    })
  }
  changeValue(event){
    this.fields[event.index] = event.val;
  }
}
