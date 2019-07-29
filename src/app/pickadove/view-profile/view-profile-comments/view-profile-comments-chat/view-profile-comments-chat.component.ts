import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-view-profile-comments-chat',
  templateUrl: './view-profile-comments-chat.component.html',
  styleUrls: ['./view-profile-comments-chat.component.css']
})
export class ViewProfileCommentsChatComponent implements OnInit {
  submitForm: FormGroup;

  submit = false;

  comments : any = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.submitForm = this.formBuilder.group({
      nickName: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
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
