import { Component, OnInit, Input } from '@angular/core';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/users.service';
import { element } from 'protractor';
import { Router } from '@angular/router';

interface SearchField{
  state: string
  name : string,
  ageFrom : string,
  ageTo : string,
  heightFrom : string,
  heightTo : string,
  location : string
}

interface SearchResult{
  address: string
  age: number
  comment: {id_comment: number, id_user: number, comment: string, commenttype: string, created_at: string}
  comments: number
  complaints: number
  contact_mobile: any
  contact_mobile_unreveal: any
  email: number
  firstname: number
  galleries: [{id_gallery: number, imgurl: string}]
  height: number
  id_location: number
  id_user: number
  imgurl: string
  isFeatured: number
  isVerified: number
  lastname: number
}

interface Profile{
  address: string
  age: number
  comments: number
  complaints: number
  email: string
  firstname: string
  height: number
  id_location: number
  id_user: number
  imgurl: string
  isFeatured: number
  isVerified: number
  lastname: string
}

interface recentProfile{
  age: number
  firstname: string
  imgurl: string
  lastname: string
  user_id: number
}

interface Service{
  id_services: number
  label: string
  value: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showAD = false;

  @Input()state : string;

  searchFields: SearchField = {
    state: "",
    name : "",
    ageFrom : "",
    ageTo : "",
    heightFrom : "",
    heightTo : "",
    location : ""
  };

  searchResult: SearchResult;
  profilesResult: Array<Profile>
  historyResult : Array<recentProfile>
  services: Array<Service> = [];

  constructor(private exchangeService: DataExchangeService, private toastr: ToastrService, private userService: UsersService,  private router: Router) { }

  ngOnInit() {
    this.exchangeService.viewProfileOpenObserver.subscribe(id => {
      if(id != ""){
        this.showAD = true;
      }

    })
    this.exchangeService.openHomePageObserver.subscribe(open => {
      this.showAD = !open;
    })

    this.exchangeService.serchObserver.subscribe(searchKey=>{
      if(searchKey != null){
        this.state = searchKey;
        this.search();
      }
    })

    this.exchangeService.viewProfileOpenObserver.subscribe(id => {
      if(id != ""){
        this.initRecent();
        $(window).scrollTop(0);
      }      
    })

    this.userService.getGirlsService(localStorage.getItem('user_id'), localStorage.getItem('token'), (services)=> {
      if(services.success == 1){
        this.services = services.data;
      } else if(services.success == -1){
        this.router.navigate['sign']
      }
    })

  }

  search(){
    if(this.state == ""){
      this.toastr.warning("State field is required to search");
      return;
    }
    this.searchFields.state = this.state;

    var infor = this.searchFields;

    var services = [];

    this.services.forEach((element : Service) => {
      if(element.value){
        services.push(element.id_services);
      }
    })

    setTimeout (() => {
      this.exchangeService.setLoading(true);
    }, 100);
    this.userService.getTopProfile(localStorage.getItem('user_id'), localStorage.getItem('token'), infor.state, infor.name, infor.ageFrom, infor.ageTo, infor.heightFrom, infor.heightTo, infor.location, services, (resTopProfile)=>{
      if(resTopProfile.success == 1){
        this.searchResult = resTopProfile.data;
        try {
          var phone_hidden_number = this.searchResult.contact_mobile.substring(0, 3) + "XXXX"; 
          this.searchResult.contact_mobile_unreveal = phone_hidden_number;
        } catch (error) {
          
        }
        this.userService.getProfileList(localStorage.getItem('user_id'), localStorage.getItem('token'), infor.state, infor.name, infor.ageFrom, infor.ageTo, infor.heightFrom, infor.heightTo, infor.location, services, (resProfiles)=>{
          if(resProfiles.success == 1){
            this.profilesResult = resProfiles.data;
            this.userService.getHistoryList(localStorage.getItem('user_id'), localStorage.getItem('token'), (resHistory)=>{
              if(resHistory.success == 1){
                setTimeout (() => {
                  this.exchangeService.setLoading(false);
                }, 1000);
                this.historyResult = resHistory.data;
              } else if (resHistory.success == 0){
                this.toastr.error(resProfiles.message);
              } else if (resHistory.success == -1){
                this.router.navigate['sign']
              }
            })
          } else if (resProfiles.success == 0){
            this.toastr.error(resProfiles.message);
          } else if (resProfiles.success == -1){
            this.router.navigate['sign']
          }
        })
      }
      else if (resTopProfile.success == 0){
        this.toastr.error(resTopProfile.message);
      }
      else if (resTopProfile.success == -1){
        this.router.navigate['sign']
      }
    })
  }
  initRecent(){
    this.userService.getHistoryList(localStorage.getItem('user_id'), localStorage.getItem('token'), (resHistory)=>{
      if(resHistory.success == 1){
        this.historyResult = resHistory.data;
      } else if(resHistory.success == -1){
        this.router.navigate['sign']
      }
    })
  }
}
