import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UsersService } from 'src/app/service/users.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('FadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(200 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(200, style({opacity: 0})))
    ])
  ]
})
export class AdminContactComponent implements OnInit {
//field
label_name = null;
//
editField = false;
label_error = false;

public imagePath;
imgURL: any;
public message: string;
otherContacts: any;

constructor(
  private formBuilder: FormBuilder, 
  private usersService: UsersService,
  private toastr: ToastrService,
  private exchangeService: DataExchangeService,
  public router: Router
) { }

ngOnInit() {
  this.init();
}

init(){
  this.usersService.getOtherContacts(localStorage.getItem('user_id'), localStorage.getItem('token'), (res)=>{
    if(res.success == 1){
      this.otherContacts = res.data;
      console.log(this.otherContacts)
    }else if(res.success == -1){
      this.router.navigate['sign']
    }else{
    }
    this.exchangeService.closeChangePassword(true);
  })
}

addNewField(){
  this.editField = true;
}

cancelEdit(){
  this.editField = false;
  this.imgURL = null;
}
saveEdit(){
  console.log("label name", this.label_name);

  if (this.label_name == null || this.label_name == ''){
    this.label_error = true;
  }

  if (this.imgURL == null || this.imgURL == ''){
    this.message = "Image is required"
  }

  if (this.label_error || this.message != null){
    return;
  }

  this.editField = false;

  this.imgURL = null;

  this.usersService.addAdminOtherContact(localStorage.getItem('user_id'), localStorage.getItem('token'), this.imagePath[0], this.label_name,  (res)=>{
      if(res.success == 1){
        this.toastr.success(res.message); 
        this.init();
      }else if(res.success == -1){
        this.router.navigate['sign']
      }else{
        this.toastr.error(res.message);
      }
      this.exchangeService.closeChangePassword(true);
    })
  }
  editAdminField(){
   this.editField = true;
  }
  onlabelChange(event){
    if(event != null && event != ''){
      this.label_error = false;
    }else if (event == null || event == ''){
      this.label_error = true;
    }
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    if(this.imagePath != null || this.imagePath != ''){
      this.message = null
    }
  }

  addImage(){
    $(".file_input").click();
  }

  deleteAdminContact(id){
    this.usersService.deleteAdminOtherContact(localStorage.getItem('user_id'), localStorage.getItem('token'), id,  (res)=>{
      if(res.success == 1){
        this.toastr.success(res.message); 
        this.init();
      }else if(res.success == -1){
        this.router.navigate['sign']
      }else{
        this.toastr.error(res.message);
      }
    })
  }
}