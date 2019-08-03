import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-profile-image-gallery',
  templateUrl: './view-profile-image-gallery.component.html',
  styleUrls: ['./view-profile-image-gallery.component.css']
})
export class ViewProfileImageGalleryComponent implements OnInit {

  @Input() userInfo;

  constructor() { }

  ngOnInit() {
  }

}
