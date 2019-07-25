import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataExchangeService } from '../service/data-exchange.service';
import { UsersService } from '../service/users.service'
import { from } from 'rxjs';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  verifyForm: FormGroup;
  email: String;

  error_message: any;

  verified = false;

  
  @Output()  _verified = new EventEmitter<boolean>();
  
  constructor(private formBuilder: FormBuilder, 
              private UsersService: UsersService, 
              private exchangeService: DataExchangeService,
              private router: Router) { }

  ngOnInit() {
    const status = localStorage.getItem('status');
    switch(status){
      case '-1':
        this.router.navigate(['sign']);
        return
      case '1':
        this.router.navigate(['']);
        return
      case '2':
        this.router.navigate(['']);
        return
    }
    const email = localStorage.getItem('email');
    if(email){
      this.email = email
    }
    $(document).ready(()=> {
      $('.sign').css("margin-left", ($(window).width() - $('.sign').width())/2);
    });
    $(window).resize(function(){
      $('.sign').css("margin-left", ($(window).width() - $('.sign').width())/2);
    });

    this.verifyForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.verifyForm.controls; 
  }

  onVerify() {
    this.verified = true;

    // stop here if form is invalid
    if (this.verifyForm.invalid) {
        return;
    }

    this.UsersService.verifyUser(localStorage.getItem('user_id'), this.verifyForm.value.code, localStorage.getItem('token'), (res) => {
      if (res.success == 1){
        localStorage.setItem('status','1');
        this.router.navigate(['']);
      } else{
        this.error_message = res.message;
      }
    })
  }

  requestVierication(){
    this.UsersService.requestVerificationCode(localStorage.getItem('user_id'), localStorage.getItem('token'), (res) => {
      $('input').val(null);
     if(res.success == 1){
      this.error_message = "";
     } else if(res.success == 0){
        this.error_message = res.message;
      }
    })
  }
}
