import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match';

interface Service{
  id_services: number
  label: string
  value: number
}

interface Schedule{
  isPmFrom: string,
  isPmTo: string,
  w_day: string,
  w_from: number,
  w_to: number
}


@Component({
  selector: 'app-edit-advertisers',
  templateUrl: './edit-advertisers.component.html',
  styleUrls: ['./edit-advertisers.component.css']
})
export class EditAdvertiserComponents implements OnInit {

  week = [{id: 0, name: 'SUN'},{id: 1, name: 'MON'},{id: 2, name: 'TUE'},{id: 3, name: 'WED'},{id: 4, name: 'THU'},{id: 5, name: 'FRI'},{id:6, name: 'SAT'}]
  hour = [{id: 1, name: 1},{id: 2, name: 2},{id: 3, name: 3},{id: 4, name: 4},{id: 5, name: 5},{id: 6, name: 6},
          {id: 7, name: 7},{id: 8, name: 8},{id: 9, name: 9},{id: 10, name: 10},{id: 11,  name: 11},{id: 12, name: 12}]
  timeFormat = [{id: 0, name: 'AM'}, {id: 1, name: 'PM'}]

  userinfo: any;
  services: any;
  galleries: any;
  workHours: Array<Schedule> = [];
  comments: any;
  complaints: any;

  updateForm: FormGroup;
  update: boolean = false;
  view_id: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private UsersService: UsersService, 
    private exchangeService: DataExchangeService, 
    private router: Router,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
        validator: MustMatch('newpassword', 'confirmPassword'),
    });

    this.route.paramMap.subscribe(params => {
      this.view_id = this.route.snapshot.paramMap.get('id');

      setTimeout (() => {
        this.exchangeService.setLoading(true);
       }, 100);
      this.UsersService.getProfileDetailsById(localStorage.getItem('user_id'), localStorage.getItem('token'), this.view_id, (details)=> {
        if(details.success == 1){
          this.userinfo = details.data;
          console.log(this.userinfo)
          // try {
          //   var phone_hidden_number = this.userinfo.contact_mobile.substring(0, 3) + "XXXX"; 
          //   this.userinfo.contact_mobile_unreveal = phone_hidden_number;
          // } catch (error) {
            
          // }
          this.services = this.userinfo.services
          this.userinfo.workhours.forEach((element : Schedule) => {
            var schedule={
              isPmFrom: this.timeFormat[element.isPmFrom].name,
              isPmTo: this.timeFormat[element.isPmTo].name,
              w_day: this.week[element.w_day].name,
              w_from: element.w_from,
              w_to: element.w_to
            }
            this.workHours.push(schedule);
          });
          this.UsersService.getComments(localStorage.getItem('user_id'), localStorage.getItem('token'), this.view_id, 0,  (res)=>{
            if (res.success == 1){
            this.comments = res.data;
            this.UsersService.getComments(localStorage.getItem('user_id'), localStorage.getItem('token'), this.view_id, 1,  (res)=>{
              if (res.success == 1){
              this.complaints = res.data;
              } else if(res.success == 0){
              } else if(res.success == -1){
              this.router.navigate['sign']
              }
            })
            } else if(res.success == 0){
            } else if(res.success == -1){
            this.router.navigate['sign']
            }
          })
        } else if(details.success == -1){
          this.router.navigate['sign']
        }
      });
    })
  }

  get f() { 
    return this.updateForm.controls; 
  }

  onUpdate(){
    this.update = true;

      // stop here if form is invalid
      if (this.updateForm.invalid) {
          return;
      }

      var userInfo = this.updateForm.value;
      this.UsersService.changeAdminUserPassword(localStorage.getItem('user_id'), localStorage.getItem('token'), this.view_id, userInfo.newpassword, (res)=>{
        if(res.success == 1){
          this.toastr.success(res.message); 
          this.exchangeService.refreshEditPage(true);
        }else if(res.success == -1){
          this.router.navigate['sign']
        }else{
          this.toastr.error(res.message);
        }
        this.exchangeService.closeChangePassword(true);
      })
  }

}
