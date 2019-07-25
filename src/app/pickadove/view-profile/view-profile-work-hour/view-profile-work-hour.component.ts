import { Component, OnInit, Input } from '@angular/core';

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
  workhours: [],
  services: []
}

@Component({
  selector: 'app-view-profile-work-hour',
  templateUrl: './view-profile-work-hour.component.html',
  styleUrls: ['./view-profile-work-hour.component.css']
})
export class ViewProfileWorkHourComponent implements OnInit {

  @Input() userInfo : UserInfo;

  constructor() { }

  ngOnInit() {
  }
}
