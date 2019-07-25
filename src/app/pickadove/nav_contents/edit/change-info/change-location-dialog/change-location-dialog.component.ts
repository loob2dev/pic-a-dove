import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface Address{
  long_name: string
  short_name: string
  types: []
}

@Component({
  selector: 'app-change-location-dialog',
  templateUrl: './change-location-dialog.component.html',
  styleUrls: ['./change-location-dialog.component.css']
})
export class ChangeLocationDialogComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;

  private state: string;
  private address: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private exchangeService: DataExchangeService, private userService: UsersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() { 
  }
  onAutocompleteSelected(result: PlaceResult) {
    result.address_components.forEach((element) =>{
      if (element.types[0] != null && element.types[0].indexOf("administrative_area_level") > -1){
        this.state = element.short_name;
      }
      if(element.types[0] != null && element.types[0] == "locality"){
        this.address = element.short_name;
      }
    })
  }

  onLocationSelected(location: Location) {
    this.data.latitude = location.latitude;
    this.data.longitude = location.longitude;
  }

  changeLocation(){
    if($("input").val() == null && $("input").val() == ""){
      return;
    }
    this.exchangeService.setLoading(true);
    this.userService.changeLocation(localStorage.getItem('user_id'), localStorage.getItem('token'), this.data.latitude, this.data.longitude, this.address, this.state, (res)=>{
      if(res.success == 1){
        this.toastr.success(res.message); 
        this.exchangeService.refreshEditPage(true);
      }else if(res.success == -1){
        this.router.navigate['sign']
      }
      else{
        this.toastr.error(res.message);
      }
      setTimeout (() => {
        this.exchangeService.setLoading(false);
      }, 1000);
    })
    this.exchangeService.closeChangeLocation(true);
  }

  cancel(){
  }
}
