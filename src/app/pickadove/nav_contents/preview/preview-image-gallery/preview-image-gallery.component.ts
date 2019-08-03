import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-image-gallery',
  templateUrl: './preview-image-gallery.component.html',
  styleUrls: ['./preview-image-gallery.component.css']
})
export class PreviewImageGalleryComponent implements OnInit {

  galleries: [];

  images: any = [
    {id: "0", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "1", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "2", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "3", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "4", locked: false, croppedImage: "../../../../assets/img/avatar.png" }];

  constructor(private exchangeService: DataExchangeService, private userService: UsersService,  private router: Router) { }

  ngOnInit() {
    this.userService.getMyProfileDetails(localStorage.getItem('user_id'), localStorage.getItem('token'), (details)=> {
      if(details.success == 1){
        this.galleries = details.data.galleries;
      }else if(details.success == -1){
        this.router.navigate['sign']
      }
    });
  }

}
