import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.css']
})
export class ServiceSelectionComponent implements OnInit {

  services=[]

  constructor(private userservice: UsersService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.userservice.getGirlsService(localStorage.getItem('user_id'), localStorage.getItem('token'), (services)=> {
      if(!services.success){
        return;
      }
      this.services = services.data;
    })
  }
  click(event){
    this.userservice.saveGirlService(localStorage.getItem('user_id'), localStorage.getItem('token'), this.services[event.index].id_services, event.val ? 1 : 0, (res)=>{
      if(res.success == 1){
        this.toastr.success(res.message); 
      }else if(res.success == -1){
        this.router.navigate['sign']
      }else{
        this.toastr.error(res.message);
      }
    })
  }
}
