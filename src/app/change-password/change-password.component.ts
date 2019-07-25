import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  registerForm: FormGroup;
  signup = false;

  signup_error = "";

  verified = false;

  reset_key : string = "";

  error: string;
  success: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private UsersService: UsersService, public router: Router) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      const reset_key = this.route.snapshot.paramMap.get('id');

      this.UsersService.verifyResetKey(reset_key, (res)=>{
        if(res.success == 1){
          this.verified = true;
          localStorage.setItem('user_id', res.data.user_id);
          this.reset_key = this.route.snapshot.paramMap.get('id');
        }else if(res.success == -1){
          this.router.navigate['sign']
        }
        else{
          // this.router.navigate(['sign']);
          this.error = res.message;
        }
      })
    })

    this.registerForm = this.formBuilder.group({
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
    this.UsersService.resetPassword(localStorage.getItem('user_id'),  this.registerForm.value.password, this.reset_key, (res)=>{
      if(res.success == 1){
        this.success = res.message;
      }else if(res.success == -1){
        this.router.navigate['sign']
      }else{
        this.error = res.error;
      }
    })
  }
}
