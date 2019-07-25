import { Component, OnInit, Input } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';

interface Profile{
  address: string
  age: number
  comments: number
  complaints: number
  email: string
  firstname: string
  height: number
  id_location: number
  id_user: number
  imgurl: string
  isFeatured: number
  isVerified: number
  lastname: string
}

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.css']
})
export class HomeGalleryComponent implements OnInit {

  @Input()profiles: Array<Profile>;

  constructor(private exchangeService: DataExchangeService) { }

  ngOnInit() {
  }

  selectAd(id){
    localStorage.setItem('view_id', id);
    this.exchangeService.openViewProfile(id);
  }
}
