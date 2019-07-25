import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { ChangeLocationDialogComponent } from './change-location-dialog/change-location-dialog.component';
import { ChangePassDialogComponent } from 'src/app/pickadove/nav_contents/edit/change-info/change-pass-dialog/change-pass-dialog.component';
import { ChangeNameDialogComponent } from './change-name-dialog/change-name-dialog.component';
import { ChangeEmailDialogComponent } from './change-email-dialog/change-email-dialog.component';
import { UsersService } from 'src/app/service/users.service';

declare var $: any;

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {

  @Input()userinfo: any;
  

  constructor(public dialog: MatDialog, private exchangeService: DataExchangeService, private userService: UsersService) {
   }

  selected = 'Min';
  on=false;

  ngOnInit() {
    
  }

  clickLabelOn(){
    $(".switch_main").click();
  }

  clickLabelOff(){
    $(".switch_main").click();
  }

  onChange($event){
    this.on = $event;
  }

  openChangeLocationDialog(){
      
    this.exchangeService.closeChangeLocation(false);    
    const dialogRef = this.dialog.open(ChangeLocationDialogComponent, { 
      data: {
        latitude: this.userinfo.data.locationInfo.latitude,
        longitude: this.userinfo.data.locationInfo.longitude,
      }
    });
    this.exchangeService.changeLocationObserver.subscribe(close=>{
      if(close){
        dialogRef.close()
      }
    })
  }

  openChangePsswordDialog(): void{
    this.exchangeService.closeChangePassword(false);    
    const dialogRef = this.dialog.open(ChangePassDialogComponent, {
      width: '300px',
      data: {}
    });

    this.exchangeService.changePasswordObserver.subscribe(close=>{
      if(close){
        dialogRef.close()
      }
    })
  }

  openChangenNameDialog(): void{
    this.exchangeService.closeChangeName(false);    
    const dialogRef = this.dialog.open(ChangeNameDialogComponent, {
      width: '300px',
      data: {
        firstname: this.userinfo.data.firstname,
        lastname: this.userinfo.data.lastname}
    });

    this.exchangeService.changeNameObserver.subscribe(close=>{
      if(close){
        dialogRef.close()
      }
    })
  }
  openChangeEmailDialog(): void{
    this.exchangeService.closeChangeEmail(false);  
    const dialogRef = this.dialog.open(ChangeEmailDialogComponent, {
      width: '300px',
      data: {email: this.userinfo.data.email}
    });
    this.exchangeService.changeEmailObserver.subscribe(close=>{
      if(close){
        dialogRef.close()
      }
    })
  }
}
