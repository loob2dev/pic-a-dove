import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataExchangeService } from 'src/app/service/data-exchange.service';

export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-change-name-dialog',
  templateUrl: './change-name-dialog.component.html',
  styleUrls: ['./change-name-dialog.component.css']
})
export class ChangeNameDialogComponent implements OnInit {

  registerForm: FormGroup;
  isRegisterd = false;

  error: string;
  success: string;

  constructor(public dialogRef: MatDialogRef<ChangeNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private exchangeService : DataExchangeService, private formBuilder: FormBuilder, private userService: UsersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  get f_up() { 
    return this.registerForm.controls; 
  }

  onChangeName(){
    this.isRegisterd = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.exchangeService.setLoading(true);
    var userInfo = this.registerForm.value;
    this.userService.changeName(localStorage.getItem('user_id'), localStorage.getItem('token'), userInfo.firstname, userInfo.lastname, (res)=>{
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
      this.exchangeService.closeChangeName(true);
    })
  }

}
