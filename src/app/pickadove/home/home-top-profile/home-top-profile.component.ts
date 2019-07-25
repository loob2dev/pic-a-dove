import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DataExchangeService } from 'src/app/service/data-exchange.service';
import { CarouselModule, WavesModule, CarouselComponent } from 'angular-bootstrap-md';

declare var $:any;

interface SearchResult{
  address: string
  age: number
  comment: {id_comment: number, id_user: number, comment: string, commenttype: string, created_at: string}
  comments: number
  complaints: number
  contact_mobile: number
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

@Component({
  selector: 'app-home-top-profile',
  templateUrl: './home-top-profile.component.html',
  styleUrls: ['./home-top-profile.component.css'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(2000, style({opacity: 1}))
      ]) 
    ])
  ]
})

export class HomeTopProfileComponent implements OnInit {

  animation=false;

  @Input() result: SearchResult;
  @ViewChild(CarouselComponent,  {static: false}) carousel : CarouselComponent;

  data={
    name: 'kayla smith',
    img: "../../../../assets/img/sample-user.png",
    location: 'holden hill',
    status: 'online',
    heart: 20,
    heart_broken: 1,
    recent_comment: '',
    contact: '',
    gallery: [
      "../../../../assets/img/sample-user.png",
      "../../../../assets/img/sample-user.png",
      "../../../../assets/img/sample-user.png",
      "../../../../assets/img/sample-user.png",
      "../../../../assets/img/sample-user.png",
      "../../../../assets/img/sample-user.png",
      "../../../../assets/img/sample-user.png"
    ]
  }
  images:any=[];
  all:any = [];
  currentPosition = 0;
  right = false;
  left = false;

  constructor(private exchangeService: DataExchangeService ) { }

  ngOnInit() {
    for(var i = 0; i < this.data.gallery.length; i++){
      
      if(i%3 == 0){
        this.all.push([]);
      }
      this.all[Math.floor(i/3)].push(this.data.gallery[i]);
    }
    if(this.all.length > 1){
      this.right = true;
    }
    if(this.all.length > 0){
      this.images = this.all[this.currentPosition];
    }
    this.slides = this.chunk(this.cards, 3);
  }

  rightImage(){
  //   this.images = [];
  //   setTimeout (() => {
  //     this.currentPosition++;
  //     for(var i = 0; i < this.all[this.currentPosition].length; i++){
  //       this.images.push(this.all[this.currentPosition][i]);
  //     }

  //     if(this.currentPosition + 1 >= this.all.length){
  //       this.right = false;
  //       }else{
  //         this.right = true;
  //       }
  //       if (this.currentPosition > 0){
  //         this.left = true;
  //       }else{
  //         this.left = false;
  //       }
  //  }, 300);
      this.carousel.nextSlide();
  }
  leftImage(){
  //   this.images = [];
  //   setTimeout (() => {
  //     this.currentPosition--;
  //     for(var i = 0; i < this.all[this.currentPosition].length; i++){
  //       this.images.push(this.all[this.currentPosition][i]);
  //     }

  //     if(this.currentPosition + 1 >= this.all.length){
  //       this.right = false;
  //       }else{
  //         this.right = true;
  //       }
  //       if (this.currentPosition > 0){
  //         this.left = true;
  //       }else{
  //         this.left = false;
  //       }
  //  }, 300);
    this.carousel.previousSlide();
  }
  selectAd(id){
    localStorage.setItem('view_id', id);
    this.exchangeService.openViewProfile(id);
  }

  cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 8',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 9',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
}
