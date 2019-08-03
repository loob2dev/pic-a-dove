import { Component, OnInit, Input } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Router } from '@angular/router';

interface User{
  adminFields: Array<Field>,
  birthday: string,
  contact_mobile: string,
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
interface Field{
  content_dropdown: number
  content_entry: string,
  field_type: any,
  isrequired: any,
  label: string,
  id_admin: any,
  combo: [{
    id: any,
    content: string
  }],
  selected: any,
  error: boolean
  val: string
}

@Component({
  selector: 'app-preview-persional-info',
  templateUrl: './preview-persional-info.component.html',
  styleUrls: ['./preview-persional-info.component.css']
})
export class PreviewPersionalInfoComponent implements OnInit {

  userinfo: User;

  constructor(private exchangeService: DataExchangeService, private userService: UsersService, private toastr: ToastrService,  private router: Router) { }

  ngOnInit() {
    setTimeout (() => {
      this.exchangeService.setLoading(true);
     }, 100);
     this.userService.getMyProfileDetails(localStorage.getItem('user_id'), localStorage.getItem('token'), (details)=> {
      if(details.success == 1){
        this.userinfo = details.data;
        this.exchangeService.InitUsername(this.userinfo.firstname + " " + this.userinfo.lastname);
        setTimeout (() => {
          this.exchangeService.setLoading(false);
      }, 1000);
      } else if(details.success == -1){
        this.router.navigate['sign']
      }
    });
     
  }

}
