import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface Field{
  field_type: any,
  isrequired: any,
  label: string,
  id_admin: any,
  combo: [{
    id: any,
    content: string
  }],
  selected: any,
  error: boolean
}

interface Schedule {
  created_at: string,
  id_user: number,
  id_workhours: number,
  isPmFrom: number,
  isPmTo: number,
  w_day: number,
  w_from: number,
  w_to: number
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  adminFields = [];
  details: any;
  details_data: any = {};
  workHours: [];

  constructor(private exchangeService: DataExchangeService, private userService: UsersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.init();
    this.exchangeService.reFreshEditObserver.subscribe(refresh=>{
      if(refresh){
        this.init();
      }
    })
  }

  init(){
    setTimeout (() => {
      this.exchangeService.setLoading(true);
     }, 100);
    this,this.userService.getWorkHours(localStorage.getItem('user_id'), localStorage.getItem('token'), (hours) => {
      if(!hours.success){
        return
      }
      this.workHours = hours.data;
      this.userService.getAdminFields(localStorage.getItem('user_id'), localStorage.getItem('token'), (adminfields)=> {
        if(!adminfields.success){
          return;
        }
        this.userService.getMyProfileDetails(localStorage.getItem('user_id'), localStorage.getItem('token'), (details)=> {
          if(details.success){
            var selected = "";
            this.details = details;
            this.details_data = details.data;
            this.details_data.birthday_error = false;
            this.details_data.height_error = false;

            this.exchangeService.InitUsername(this.details_data.firstname + " " + this.details_data.lastname);
            adminfields.data.forEach((element) => {
              var BreakException = {};
            try {
              details.data.adminFields.forEach(field => {
                if(element.id_admin == field.id_admin){
                  selected = field.field_type? field.content_dropdown : field.content_entry;
                  throw BreakException;
                }
              });
            }catch(e){
              var field = {
                field_type: element.field_type,
                isrequired: element.isrequired,
                label: element.label,
                id_admin: element.id_admin,
                combo: element.combo,
                selected: selected,
                error: false
              }
              this.adminFields.push(field);
            }
            });
            setTimeout (() => {
              this.exchangeService.setLoading(false);
          }, 1000);
          }
        });
      })
    })
  }

  completeProfile(){
    var user_id = localStorage.getItem('user_id')
    var token = localStorage.getItem('token');
    var birthday = this.details_data.birthday;
    if(birthday == null || birthday == ""){
      this.details_data.birthday_error = true;
      return;
    }
    var height = this.details_data.height;
    if(height == null || height == ""){
      this.details_data.height_error = true;
      return;
    }
    var mobile = this.details_data.contact_mobile;
    var wechat = this.details_data.contact_wechat
    var whatsapp = this.details_data.contact_whatsapp
    var preferred = this.details_data.contact_preferred
    var workhours = [];
    this.workHours.forEach((element : Schedule)=>{
      var schedul = {
        "day": element.w_day,
        "from": element.w_from,
        "to": element.w_to,
        "isPmFrom": element.isPmFrom,
        "isPmTo": element.isPmTo
      }
      workhours.push(schedul);
    })
    var adminFields = [];
    this.adminFields.forEach((element : Field) => {
      if(element.isrequired && (element.selected == null || element.selected == "")){
        element.error = true;
        return;
      }
      var field = {
        "id_admin": element.id_admin,
        "field_type": element.field_type,
        "content": element.selected
      }
      adminFields.push(field);
    });
    this.userService.completeProfile(user_id, token, birthday, height, mobile, wechat, whatsapp, preferred, workhours, adminFields, (res) =>{
      if(res.success == 1){
        this.toastr.success(res.message);
        this.exchangeService.refreshEditPage(true);
      }else if(res.success == -1){
        this.router.navigate['sign']
      }else{
        this.toastr.error(res.message);
      }
    })
  }
}
