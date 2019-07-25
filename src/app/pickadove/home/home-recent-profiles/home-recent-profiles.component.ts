import { Component, OnInit, Input } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';

interface recentProfile{
  age: number
  firstname: string
  imgurl: string
  lastname: string
  user_id: number
}


@Component({
  selector: 'app-home-recent-profiles',
  templateUrl: './home-recent-profiles.component.html',
  styleUrls: ['./home-recent-profiles.component.css']
})
export class HomeRecentProfilesComponent implements OnInit {
  
  @Input() profiles: Array<recentProfile>;

  constructor(private exchangeService: DataExchangeService) { }

  ngOnInit() {
  }

  selectAd(id){
    localStorage.setItem('view_id', id);
    this.exchangeService.openViewProfile(id);
  }

}
