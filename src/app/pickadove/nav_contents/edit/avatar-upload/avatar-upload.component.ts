import { Component, OnInit, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialog } from '@angular/material/dialog';
import { SelectImageDialogComponent } from '../select-image-dialog/select-image-dialog.component';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.css']
})
export class AvatarUploadComponent implements OnInit {

  public imagePath;
  public message: string;

  constructor(public dialog: MatDialog, private exchangeService: DataExchangeService, private userservice: UsersService, private router: Router) { }

  data = { croppedImage: "../../../../assets/img/avatar.png" };

  @Input() userinfo;

  old_src : any;

  ngOnInit() {
    this.initAvatar();
  }

  initAvatar(){
    this.userservice.getProfileImage(localStorage.getItem('user_id'), localStorage.getItem('token'), localStorage.getItem('user_id'), (res)=>{
      if(res.success == 1){
        this.data.croppedImage = 'http://192.168.1.140:4000/' + res.data.imgurl;
      }else if(res.success == -1){
        this.router.navigate['sign']
      }
    })
  }

  selectImage() {
    this.exchangeService.closedUploadDlg(false);

    this.old_src = this.data.croppedImage;

    const dialogRef = this.dialog.open(SelectImageDialogComponent, { data: this.data});
    
    this.exchangeService.selectDlgStatus.subscribe(close => {
      
      if  (close == true){
        // this.initAvatar();
        dialogRef.close()
      }
    })
   }
}
