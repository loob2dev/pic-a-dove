import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-view-profile-comments-complaints',
  templateUrl: './view-profile-comments-complaints.component.html',
  styleUrls: ['./view-profile-comments-complaints.component.css']
})
export class ViewProfileCommentsComplaintsComponent implements OnInit {
  submitForm: FormGroup;

  submit = false;

  comments : any = [];

  constructor(private exchangeService: DataExchangeService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UsersService,
    private router: Router) { }

    ngOnInit() {
    this.submitForm = this.formBuilder.group({
    nickName: ['', [Validators.required, Validators.required]],
    content: [''],
    });

    //call api
    // this.exchangeService.setLoading(true);
    this.userService.getComments(localStorage.getItem('user_id'), localStorage.getItem('token'), localStorage.getItem('user_id'), 1,  (res)=>{
      if (res.success == 1){
      this.comments = res.data;
      console.log(this.comments)
      } else if(res.success == 0){
      this.toastr.error(res.message);
      } else if(res.success == -1){
      this.toastr.error(res.message);
      this.router.navigate['sign']
      }
      setTimeout (() => {
      // this.exchangeService.setLoading(false);
      }, 1000);
    })  
  }

  get f() { 
    return this.submitForm.controls; 
  }

  onSubmit() {
    this.submit = true;

    // stop here if form is invalid
    var iErrorCount = 0;
    if ($(".nickname-input").val() == ''){
      this.submitForm.controls.nickName.setErrors({required: true});
      iErrorCount++;
    }
    if ($(".chat-contnet-input").val() == ''){
      this.submitForm.controls.content.setErrors({required: true});
      iErrorCount++;
    }
    if(iErrorCount > 0){
      return;
    }

    var comment = {
      nickName: this.submitForm.value.nickName,
      time: "",
      content: $(".chat-contnet-input").val()
    }
    this.comments.push(comment);

    $(".chat-contnet-input").val('');
    $(".nickname-input").val('');    
  }

  addEmoji(event){
    var text = $(".chat-contnet-input").val() + event.emoji.native;
    $(".chat-contnet-input").val(text);
    this.submitForm.controls.content.setErrors(null)
  }
}
