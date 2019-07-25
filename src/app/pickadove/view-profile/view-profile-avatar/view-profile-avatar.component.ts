import { Component, OnInit, Input } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
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
  selector: 'app-view-profile-avatar',
  templateUrl: './view-profile-avatar.component.html',
  styleUrls: ['./view-profile-avatar.component.css']
})
export class ViewProfileAvatarComponent implements OnInit {

  public imagePath;
  public message: string;

  @Input() userInfo :UserInfo;

  constructor() { }

  data = { croppedImage: "../../../../assets/img/avatar.png" };
  userinfo: any;

  old_src : any;

  ngOnInit() {
    
  }
}
