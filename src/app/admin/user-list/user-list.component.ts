import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { Router } from '@angular/router';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userData: any;

  constructor(
      private UsersService: UsersService,
      private toastr: ToastrService,
      private exchangeService: DataExchangeService,
      public router: Router
  ) { }

  ngOnInit() {
    //call api
    this.exchangeService.setLoading(true);
    this.UsersService.getAdminUserList(localStorage.getItem('user_id'), localStorage.getItem('token'), (res)=>{
      if (res.success == 1){
        this.toastr.success(res.message);
        this.userData = res.data
        console.log(this.userData)
      } else if(res.success == 0){
        this.toastr.error(res.message);
      } else if(res.success == -1){
        this.toastr.error(res.message);
        this.router.navigate['sign']
      }
      setTimeout (() => {
        this.exchangeService.setLoading(false);
      }, 1000);
    })  
  }

  viewAdertiser(id){
    console.log(id)
    this.router.navigate(['admin/edit-advertiser/' + id]);
  }
}
