import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';

interface UserInfo{
  address: string
  adminFields: [{
    content_combo: []
    content_entry: any
    field_type: number
    id_admin: number
    id_content: number
    label: string
  }]
  birthday: string
  contact_mobile: number
  contact_mobile_unreveal: number
  contact_preferred: string
  contact_wechat: string
  contact_whatsapp: string
  description: string
  email: string
  firstname: string
  galleries: [{
    id_gallery: number
    imgurl: string
  }]
  height: number
  id_location: number
  id_user: number
  imgurl: string
  isFeatured: number
  isVerified: number
  lastname: string
  latitude: number
  longitude: null
  workhours: []
}

@Component({
  selector: 'app-view-profile-persional-info',
  templateUrl: './view-profile-persional-info.component.html',
  styleUrls: ['./view-profile-persional-info.component.css']
})
export class ViewProfilePersionalInfoComponent implements OnInit {

  @Input() userInfo :UserInfo;

  data : any = {
    persion_ingo: {
      name: 'georgia smiths',
      status: 'online',
      location: 'Bedford Park',
      damage: '180/1',
      age: '20-22',
      VBSive: '34D',
      room_cd: 'Include',
      service_location: 'Hotel Apparement'
    },
    contact_info: {
      prefered_contact_info: 'Call&Text',
      mobile_number: '0411-163-588'
    },
    other_contacts: {
      wechat: '12489-451',
      wexin: '456123-45'
    }
  }

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  reavel: boolean = false;
  revealContant(){
    this.reavel = true

    this.usersService.revealContactInfo(localStorage.getItem('user_id'), localStorage.getItem('token'), this.userInfo.id_user, (res)=>{});
  }
}
