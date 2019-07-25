import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile-image-gallery',
  templateUrl: './view-profile-image-gallery.component.html',
  styleUrls: ['./view-profile-image-gallery.component.css']
})
export class ViewProfileImageGalleryComponent implements OnInit {

  images: any = [
    {id: "0", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "1", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "2", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "3", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "4", locked: false, croppedImage: "../../../../assets/img/avatar.png" }];

  constructor() { }

  ngOnInit() {
  }

}
