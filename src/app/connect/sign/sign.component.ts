import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../helpers/must-match';
import { UsersService } from '../../service/users.service';
import { DataExchangeService } from '../../service/data-exchange.service';
import { MapsService } from 'src/app/maps.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit{

  registerForm: FormGroup;
  loginForm: FormGroup;
  isSignin = true;

  signin = false;
  signup = false;

  //google map
  lat: string = '';
  lng: string = '';
  address: string = '';
  state: string = '';
  signup_error = "";
  signin_error = "";
  sent_success = "";

  @Output()  verfication = new EventEmitter<boolean>();
  @Output() login_status = new EventEmitter<any>();


  constructor(private formBuilder: FormBuilder, 
              private UsersService: UsersService,
              private exchangeService: DataExchangeService, 
              private mapService: MapsService,
              public router: Router) { }
    
  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
    this.registerForm = this.formBuilder.group({
      advertise: [false],
      browser: [true],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      confirmAccept: [false, Validators.requiredTrue]
    }, {
        validator: MustMatch('password', 'confirmPassword'),
    });

    //google map
    this.mapService.getLocation().subscribe(data => {
      this.lat = data.latitude;
      this.lng = data.longitude;
      this.address = data.city;
      this.state = data.continent_code;
    })
  }
  onCheck(id) {
    $('#'+id).prop("checked", false);
  }
  // convenience getter for easy access to form fields
  get f_up() { 
    return this.registerForm.controls; 
  }
  get f_in() { 
    return this.loginForm.controls; 
  }

  onSignin() {
      this.signin = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      var userInfo = this.loginForm.value;
      this.UsersService.signin(userInfo.email, userInfo.password, (res)=> {
        if(res.success == 1){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user_id', res.data.user_id);
          localStorage.setItem('status', res.data.status);
          localStorage.setItem('type', res.data.type);
          switch(res.data.status){
            case -1:
              this.router.navigate(['sign']);
              break;
            case 0:
              this.router.navigate(['verification']);
              break;
            case 1:
            case 2:
              if (res.data.type == '0' || res.data.type == '1'){
                this.router.navigate(['']);
              }else{
                this.router.navigate(['admin']);
              }
              
              break;
          }
        }else if(res.success == -1){
          this.router.navigate['sign']
        }else{
          this.signin_error = res.message;
        }
      });

      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }

  onSignup() {
    this.signup = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    var location = {
      latitude: this.lat,
      longitude: this.lng,
      address: this.address,
      state: this.state
    }

    var userInfo = this.registerForm.value;
    this.UsersService.signup(userInfo.email, userInfo.firstName, userInfo.lastName, userInfo.password, userInfo.advertise, location, (res) => {
      if (res.success == 1){
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('status', '0');
        localStorage.setItem('email', userInfo.email);
        this.router.navigate(['verification']);
      }else if(res.success == -1){
        this.router.navigate['sign']
      } else{
        this.signup_error = res.message;
      }
    });
    
    this.exchangeService.changeMessage(userInfo.email);
  }

  forgot_password(){
    var userInfo = this.loginForm.value;
    this.UsersService.forgot_password(userInfo.email, (res)=>{
      if(res.success == 1){
        this.sent_success = res.message;
        this.signin_error = '';
      }else if(res.success == -1){
        this.router.navigate['sign']
      } else{
        this.signin_error = res.message;
        this.sent_success = '';
      }
    })
  }
}