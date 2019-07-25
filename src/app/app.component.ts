import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  constructor(private toastr: ToastrService) { }
    
  ngOnInit(): void{  }
}