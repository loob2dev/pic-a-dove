import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-comments-chat',
  templateUrl: './comments-chat.component.html',
  styleUrls: ['./comments-chat.component.css']
})
export class CommentsChatComponent implements OnInit {

  submitForm: FormGroup;

  submit = false;

  comments : any = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.submitForm = this.formBuilder.group({
      nickName: ['', [Validators.required, Validators.required]],
      content: [''],
    });
  }

  get f() { 
    return this.submitForm.controls; 
  }

  onSubmit() {
    this.submit = true;

    // stop here if form is invalid
    if (this.submitForm.invalid) {
        return;
    }

    var comment = {
      nickName: this.submitForm.value.nickName,
      time: "",
      content: this.submitForm.value.content
    }
    this.comments.push(comment);

    $(".chat-contnet-input").val(null);
    $(".nickname-input").val(null);
    
  }

  addEmoji(event){
    var text = $(".chat-contnet-input").val() + event.emoji.native;
    $(".chat-contnet-input").val(text);
  }
}
