import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';

interface Schedule{
  isPmFrom: string,
  isPmTo: string,
  w_day: string,
  w_from: number,
  w_to: number
}

interface User{
  adminFields: []
  birthday: string
  contact_mobile: string
  contact_other: string
  contact_preferred: string
  contact_wechat: string
  contact_whatsapp: string
  created_at: string
  date_lastlogin: string
  email: string
  firstname: string
  height: number
  id_location: number
  id_user: number
  imgurl: string
  isFeatured: number
  isVerified: number
  islive: number
  lastname: number
  locationInfo: {
    id_location: number, 
    address: string,
    state: string,
    latitude: number, 
    longitude: number,
  }
  showcontact: 1
  status: 2
  usertype: 1
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    
  }

} 
