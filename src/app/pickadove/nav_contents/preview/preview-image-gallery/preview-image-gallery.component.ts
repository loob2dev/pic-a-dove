import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-image-gallery',
  templateUrl: './preview-image-gallery.component.html',
  styleUrls: ['./preview-image-gallery.component.css']
})
export class PreviewImageGalleryComponent implements OnInit {

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
