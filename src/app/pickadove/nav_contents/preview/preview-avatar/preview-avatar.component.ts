import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-avatar',
  templateUrl: './preview-avatar.component.html',
  styleUrls: ['./preview-avatar.component.css']
})
export class PreviewAvatarComponent implements OnInit {

  public imagePath;
  public message: string;

  constructor(private exchangeService: DataExchangeService, private userservice: UsersService, private router: Router) { }

  data = { croppedImage: "../../../../assets/img/avatar.png" };
  userinfo: any;

  old_src : any;

  ngOnInit() {
    this.userservice.getMyProfileDetails(localStorage.getItem('user_id'), localStorage.getItem('token'), (details)=> {
      if(details.success){
        this.userinfo = details.data;
        this.userservice.getProfileImage(localStorage.getItem('user_id'), localStorage.getItem('token'), localStorage.getItem('user_id'), (res)=>{
          if(res.success == 1){
            this.data.croppedImage = res.data.imgcode;
          }else if(res.success == -1){
            this.router.navigate['sign']
          }
        })
      }
    });
  }
}
