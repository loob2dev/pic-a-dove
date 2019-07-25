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
  selector: 'app-view-profile-profile-details',
  templateUrl: './view-profile-profile-details.component.html',
  styleUrls: ['./view-profile-profile-details.component.css']
})
export class ViewProfileProfileDetailsComponent implements OnInit {

  @Input() userInfo : UserInfo;
  
  data = {
    about_me : "This is a dummy paragraph for display purposes only."
  }

  constructor() { }

  ngOnInit() {
  }

}
