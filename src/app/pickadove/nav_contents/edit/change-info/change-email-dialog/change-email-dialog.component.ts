import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users.service';
import { Route, Router } from '@angular/router';
import { DataExchangeService } from 'src/app/service/data-exchange.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-change-email-dialog',
  templateUrl: './change-email-dialog.component.html',
  styleUrls: ['./change-email-dialog.component.css']
})
export class ChangeEmailDialogComponent implements OnInit {

  registerForm: FormGroup;
  isRegisterd = false;

  constructor(public dialogRef: MatDialogRef<ChangeEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private exchangeService: DataExchangeService, private toastr: ToastrService, private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get f_up() { 
    return this.registerForm.controls; 
  }

  onChangeEmail(){
    this.isRegisterd = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.exchangeService.setLoading(true);
    var userInfo = this.registerForm.value;
    this.userService.changeEmail(localStorage.getItem('user_id'), localStorage.getItem('token'), userInfo.email, (res)=>{
      if(res.success == 1){
        this.toastr.success(res.message); 
      }else if(res.success == -1){
        this.router.navigate['sign']
      }else{
        this.toastr.error(res.message);
      }
      setTimeout (() => {
        this.exchangeService.setLoading(false);
      }, 1000);
      this.exchangeService.closeChangeEmail(true);  
    })
    this.exchangeService.refreshEditPage(true);
  }

}
