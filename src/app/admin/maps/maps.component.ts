import { Component, OnInit } from '@angular/core';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    public latitude: number;
    public longitude: number;

  constructor() { }

  ngOnInit() {
    this.latitude = 40.748817;
    this.longitude = -73.985428;
  }

}
