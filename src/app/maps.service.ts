import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface Location {
  city: string;
  continent_code: string;
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})

export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation(){
    // return this.http.get<Location>('http://api.ipapi.com/api/check?access_key=');
    return this.http.get<Location>('https://ipapi.co/8.8.8.8/json/');
  }
}
