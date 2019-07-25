import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  @Output() liveStatus = new EventEmitter<boolean>();
  @Input() live:boolean;

  constructor(private userService: UsersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  setLive(){
    if(this.liveStatus){
      this.userService.goLive(localStorage.getItem('user_id'), localStorage.getItem('token'), (res)=>{
        if(res.success == 1){
          this.toastr.success(res.message); 
          this.liveStatus.emit(true);
        }else if(res.success == -1){
          this.router.navigate['sign']
        }else{
          this.toastr.error(res.message);
        }
      })
    }
  }
}
