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
  @Input() services: [];

  constructor() { }

  ngOnInit() {}
  changeValue(event){
    this.fields[event.index] = event.val;
  }

  onCheck(event){
    event.object.value=event.val ? 1 : 0;
  }
}
