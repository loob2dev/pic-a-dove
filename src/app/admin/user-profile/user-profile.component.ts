import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { Router } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/helpers/must-match';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData: any;

  updateForm: FormGroup;
  update: boolean = false;

  constructor(
      private formBuilder: FormBuilder, 
      private UsersService: UsersService,
      private toastr: ToastrService,
      private exchangeService: DataExchangeService,
      public router: Router) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
        validator: MustMatch('newpassword', 'confirmPassword'),
    });

    //call api
    this.exchangeService.setLoading(true);
    this.UsersService.getAdminProfile(localStorage.getItem('user_id'), localStorage.getItem('token'), (res)=>{
      if (res.success == 1){
        this.toastr.success(res.message);
        this.userData = res.data
        console.log(this.userData)
      } else if(res.success == 0){
        this.toastr.error(res.message);
      } else if(res.success == -1){
        this.toastr.error(res.message);
        this.router.navigate['sign']
      }
      setTimeout (() => {
        this.exchangeService.setLoading(false);
      }, 1000);
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
      this.exchangeService.setLoading(true);
      this.UsersService.changePassword(localStorage.getItem('user_id'), userInfo.oldpassword, userInfo.newpassword  , localStorage.getItem('token'), (res)=>{
        if(res.success == 1){
          this.toastr.success(res.message); 
          this.exchangeService.refreshEditPage(true);
        }else if(res.success == -1){
          this.router.navigate['sign']
        }else{
          this.toastr.error(res.message);
        }
        setTimeout (() => {
          this.exchangeService.setLoading(false);
        }, 1000);
        this.exchangeService.closeChangePassword(true);
      })
  }
}
