import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { UsersService } from 'src/app/service/users.service';


interface Field {
  field_type: number,
  isrequired: number,
  label: string,
  id_admin: string,
  combo: [],
  selected: any,
  error: boolean
}

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  @Input()fields: Array<Field> ;
  @Input()userinfo: any;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private dataExhane: DataExchangeService) { }

  ngOnInit() {}
  changeValue(event){
    this.fields[event.index].selected = event.val;
    this.fields[event.index].error = false;
  }
  changeOtherValue(event){
    this.userinfo[event.index] = event.val;
    this.userinfo[event.index + "_error"] = false;
  }
}
