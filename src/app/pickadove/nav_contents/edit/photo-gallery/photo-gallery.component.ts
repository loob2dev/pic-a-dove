import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { SelectImageDialogComponent } from '../select-image-dialog/select-image-dialog.component';

declare var $:any;

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  croppedImage: any = "../../../../assets/img/avatar.png";
  images: any = [
    {id: "0", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "1", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "2", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "3", locked: false, croppedImage: "../../../../assets/img/avatar.png" },
    {id: "4", locked: false, croppedImage: "../../../../assets/img/avatar.png" }];

  current_id : any;

  constructor(public dialog: MatDialog, private exchangeService: DataExchangeService) { }

  ngOnInit() {
  }

  selectImage() {
    var data = { 
      id: this.images.length,
      croppedImage: "../../../../assets/img/avatar.png" 
    };
    this.current_id = this.images.length;
    this.images.push(data);

    this.exchangeService.closedUploadDlg(false);
    this.exchangeService.cancelDlg(false);

    //config and open dialog
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(SelectImageDialogComponent,  { data: data, disableClose: true });

    this.exchangeService.DlgCanceled.subscribe(cancel => {
      if (cancel){
        dialogRef.close()
        this.deleteIamge(this.current_id);
      }
    })

    this.exchangeService.selectDlgStatus.subscribe(close => {
      if  (close)  {
        dialogRef.close()};
      }
        
      )
  }
  deleteIamge(id){
    var tmp = [];
    for(var i = 0; i < this.images.length; i++){
      if (id != this.images[i].id){
        tmp.push(this.images[i]);
      }
    }
    this.images = tmp;
  }
}
