import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-edit-browsers',
  templateUrl: './edit-browsers.component.html',
  styleUrls: ['./edit-browsers.component.css']
})
export class EditBrowsersComponent implements OnInit {

  constructor(private route: ActivatedRoute, private UsersService: UsersService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const reset_key = this.route.snapshot.paramMap.get('id'); 
    })
  }

}
