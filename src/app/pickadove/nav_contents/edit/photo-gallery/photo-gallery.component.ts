import { Component, OnInit, Input } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { SelectImageDialogComponent } from '../select-image-dialog/select-image-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  @Input() galleries;

  croppedImage: any = "../../../../assets/img/avatar.png";

  constructor(private exchangeService: DataExchangeService, 
              private toastr: ToastrService,
              private userService: UsersService,
              private router: Router) { }

  ngOnInit() {
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      var message = "Only images are supported.";
      this.toastr.error(message);
      return;
    }
    var data = {
      imgurl: "../../../../assets/img/avatar.png" 
    };

    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      var data = {
        imgurl:  reader.result
      };
      this.galleries.push(data);
      //call api
      this.exchangeService.setLoading(true);
      this.userService.uploadGallery(localStorage.getItem('user_id'), localStorage.getItem('token'), files[0], (res)=>{
        if (res.success == 1){
          this.toastr.success(res.message);
          this.exchangeService.refreshEditPage(true);
        } else if(res.success == 0){
          this.toastr.error(res.message);
        } else if(res.success == -1){
          this.toastr.error(res.message);
          this.router.navigate['sign']
        }
        setTimeout (() => {
          this.exchangeService.setLoading(false);
        }, 1000);
      })  
    }
  }

  selectImage() {
      $(".inputFile").click();
  }
  deleteIamge(id){
    this.exchangeService.setLoading(true);
    this.userService.deleteGallery(localStorage.getItem('user_id'), localStorage.getItem('token'), id, (res)=>{
      if (res.success == 1){
        this.toastr.success(res.message);
        this.exchangeService.refreshEditPage(true);
      } else if(res.success == 0){
        this.toastr.error(res.message);
      } else if(res.success == -1){
        this.toastr.error(res.message);
        this.router.navigate['sign']
      }
      setTimeout (() => {
        this.exchangeService.setLoading(false);
      }, 1000);
    })
  }

  onLock(event){
    this.exchangeService.setLoading(true);
    this.userService.lockGallery(localStorage.getItem('user_id'), localStorage.getItem('token'), event.id, event.val, (res)=>{
      if (res.success == 1){
        this.toastr.success(res.message);
        this.exchangeService.refreshEditPage(true);
      } else if(res.success == 0){
        this.toastr.error(res.message);
      } else if(res.success == -1){
        this.toastr.error(res.message);
        this.router.navigate['sign']
      }
      setTimeout (() => {
        this.exchangeService.setLoading(false);
      }, 1000);
    })
  }
}
