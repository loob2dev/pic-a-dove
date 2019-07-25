import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../../service/users.service';
import { MustMatch } from 'src/app/helpers/must-match';
import { ToastrService } from 'ngx-toastr';
import { DataExchangeService } from 'src/app/service/data-exchange.service';

@Component({
  selector: 'app-change-pass-dialog',
  templateUrl: './change-pass-dialog.component.html',
  styleUrls: ['./change-pass-dialog.component.css']
})
export class ChangePassDialogComponent implements OnInit {

  registerForm: FormGroup;
  signup = false;

  error: string;
  success: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private exchangeService: DataExchangeService, private UsersService: UsersService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
        validator: MustMatch('password', 'confirmPassword'),
    });
  }

  get f_up() { 
    return this.registerForm.controls; 
  }
  
  onChangePassword(){
    this.signup = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    var userInfo = this.registerForm.value;
    this.exchangeService.setLoading(true);
    this.UsersService.changePassword(localStorage.getItem('user_id'), userInfo.oldPassword, userInfo.password  , localStorage.getItem('token'), (res)=>{
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
