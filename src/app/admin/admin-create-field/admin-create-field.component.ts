import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataExchangeService } from 'src/app/service/data-exchange.service';

@Component({
  selector: 'app-admin-create-field',
  templateUrl: './admin-create-field.component.html',
  styleUrls: ['./admin-create-field.component.css'],
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
export class AdminCreateFieldComponent implements OnInit {
  //field
  label_name = null;
  editItems = null;
  isRequired = false;
  //
  editField = false;
  label_error = false;

  field_items = [
    {value: '', error: false}
  ];

  adminFields: [];

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
    this.usersService.getAdminFields(localStorage.getItem('user_id'), localStorage.getItem('token'), (res)=> {
      if (res.success == 1){
        this.adminFields = res.data;
        console.log(this.adminFields)
      }else if(res.success == -1){
        this.router.navigate['sign']
      }
    });
  }

  addField(){
    this.field_items.push({value: '', error: false})
  }
  removeField(){
    if (this.field_items.length > 1){
      this.field_items.pop();
    }
  }
  addNewField(){
    this.editField = true;
  }
  cancelEdit(){
    this.editField = false;
  }
  saveEdit(){
    console.log("label name", this.label_name);
    console.log("type", this.editItems == null? 0 : 1);
    console.log("isRequired", this.isRequired);

    if (this.label_name == null || this.label_name == ''){
      this.label_error = true;
    }
    var combo = [];
    if (this.editItems != null){
      var icountError = 0;
      this.field_items.forEach(item => {
        if(item.value == null || item.value ==''){
          item.error = true;
          icountError++;
        }
        combo.push(item.value)
      })
    }

    if (this.label_error || (this.editItems != null && icountError > 0)){
      return;
    }

    this.editField = false;

    this.usersService.addAdminField(localStorage.getItem('user_id'), localStorage.getItem('token'), 
        this.editItems == null ? false : true, this.label_name  , this.isRequired ? 1 : 0 , combo,  (res)=>{
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

  onItemChange(event){
    if(event.value != null && event.value != ''){
      event.object.error = false;
    }else if (event.value == null || event.value == ''){
      event.object.error = true;
    }
  }

  deleteAdminField(id){
    this.usersService.deleteAdminField(localStorage.getItem('user_id'), localStorage.getItem('token'), id,  (res)=>{
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
