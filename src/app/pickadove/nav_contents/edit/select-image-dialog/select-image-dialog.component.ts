import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, Subscription, Subscriber, Subject } from 'rxjs';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// export interface DialogData {
//   data: any;
// }

declare var $: any;

@Component({
  selector: 'app-select-image-dialog',
  templateUrl: './select-image-dialog.component.html',
  styleUrls: ['./select-image-dialog.component.css']
})
export class SelectImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private exchangeService: DataExchangeService, private userService: UsersService, private toastr: ToastrService, private router: Router) { }

  selected = false;
  public message: string;

  ngOnInit() {
  }

  imageChangedEvent: any = '';
  imgcode: any = '';
  file: any;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.file = event.target.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.data.croppedImage = event.base64;
    this.imgcode = event.base64;
    this.file = event.file;
    this.selected = true;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    this.message = "Only images are supported.";
  }

  selectImage() {
    $('#upload_input').click();
  }

  uploadImage(){
    this.exchangeService.setLoading(true);

    this.userService.uploadProfileImage(localStorage.getItem('user_id'), localStorage.getItem('token'), this.file, this.imgcode, (res)=>{
      if(res.success == 1){
        this.toastr.success(res.message); 
        this.exchangeService.changeThumbnail(true);
        this.exchangeService.closedUploadDlg(true);
      }else if(res.success == -1){
        this.router.navigate['sign']
      }else{
        this.toastr.error(res.message);
      }
      setTimeout (() => {
        this.exchangeService.setLoading(false);
      }, 1000);
    })
  }

  // cancel(){
  //   this.exchangeService.cancelDlg(true);
  // }
}
