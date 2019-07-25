import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';

interface Service{
  id_services: number
  label: string
  value: number
}

@Component({
  selector: 'app-preview-profile-details',
  templateUrl: './preview-profile-details.component.html',
  styleUrls: ['./preview-profile-details.component.css']
})
export class PreviewProfileDetailsComponent implements OnInit {
  services: Array<Service> = [];
  data = {
    about_me : "This is a dummy paragraph for display purposes only."
  }

  constructor(private userservice: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userservice.getGirlsService(localStorage.getItem('user_id'), localStorage.getItem('token'), (services)=> {
      if(!services.success){
        return;
      }
      services.data.forEach((element : Service)=> {
        if(element.value){
          this.services.push(element);
        }
      });
    })
  }

}
