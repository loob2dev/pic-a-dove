import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

interface singupResponse {
  success: any;
  message: string;
  data: {
    status: any;
    token: string,
    user_id: string
  };
}
interface signinResponse {
  success: any;
  message: string;
}

interface verifyResponse {
  success: any;
  message: string;
}

interface forgotPassResponse {
  success: any;
  message: string;
}
interface verifyResetKeyResponse {
  success: any;
  message: string;
  data: {
    user_id: string
  };
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // uri = 'http://192.168.1.140:4000/api';
  uri = 'http://192.168.1.140:4000/api';

  constructor(private http: HttpClient) { }

  private getArgHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    };
    return httpOptions;
  }

  private getTokenHeaders(token): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': token
      })
    };
    return httpOptions;
  }
  private getImgTokenHeaders(token): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return httpOptions;
  }

  private getTokenJsonHeaders(token): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

  signup(email, firstName, lastName, password, usertype, location, callback) {
      var params = {
        email: email,
        firstname: firstName,
        lastname: lastName,
        password: password,
        usertype: usertype,
        location: location
      }
    this.http.post<singupResponse>(`${this.uri}/signup`, params)
        .subscribe(res => {
          callback(res);
        });
  }

  signin(email, password, callback){
    const httpBody = new HttpParams()
      .set('email', email)
      .set('password', password);
    this.http.post<signinResponse>(`${this.uri}/login`, httpBody, this.getArgHeaders())
      .subscribe(res=>{
        callback(res);
      })
  }

  verifyUser(user_id, code, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('code', code)
    this.http.post<verifyResponse>(`${this.uri}/verifyUser`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  requestVerificationCode(user_id, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id);
    this.http.post<verifyResponse>(`${this.uri}/requestVerificationCode`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }

  forgot_password(email, callback){
    const httpBody = new HttpParams()
      .set('email', email);
    this.http.post<forgotPassResponse>(`${this.uri}/forgotPassword`, httpBody, this.getArgHeaders())
      .subscribe(res=>{
        callback(res); 
      })
  }

  verifyResetKey(reset_key, callback){
    const httpBody = new HttpParams()
      .set('reset_key', reset_key);
    this.http.post<verifyResetKeyResponse>(`${this.uri}/verifyResetKey`, httpBody, this.getArgHeaders())
      .subscribe(res=>{
        callback(res); 
      })
  }

  resetPassword(user_id, password, reset_key, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('password', password)
      .set('reset_key', reset_key);
    this.http.post<verifyResetKeyResponse>(`${this.uri}/resetPassword`, httpBody, this.getArgHeaders())
      .subscribe(res=>{
        callback(res); 
      })
  }

  changePassword(user_id, previousPassword, newPassword, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('previousPassword', previousPassword)
      .set('newPassword', newPassword);
      this.http.post<verifyResponse>(`${this.uri}/changePassword`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  getMyProfileDetails(user_id, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id);
      this.http.post(`${this.uri}/getMyProfileDetails`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  getProfileDetailsById(user_id, token, view_id, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('view_id', view_id);
      this.http.post(`${this.uri}/getProfileDetailsById`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  getAdminFields(user_id, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id);
      this.http.post(`${this.uri}/getAdminFields`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  getWorkHours(user_id, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id);
      this.http.post(`${this.uri}/getWorkHours`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  getGirlsService(user_id, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id);
      this.http.post(`${this.uri}/getGirlsService`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  completeProfile(user_id, token, birthday, height, mobile, wechat, whatsapp, preferred, workhours, adminFields, callback){
    var params = {
      user_id: user_id,
      birthday: birthday,
      height: height,
      mobile: mobile,
      wechat: wechat,
      whatsapp: whatsapp,
      preferred: preferred,
      workhours: workhours,
      adminFields: adminFields
    }
    this.http.post(`${this.uri}/completeProfile`, params, this.getTokenJsonHeaders(token))
      .subscribe(res => {
        callback(res);
      });
  }
  changeName(user_id, token, firstname, lastname, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('firstname', firstname)
      .set('lastname', lastname);
      this.http.post(`${this.uri}/changeName`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  changeEmail(user_id, token, email, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('email', email)
      this.http.post(`${this.uri}/changeEmail`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }
  changeLocation(user_id, token, latitude, longitude, address, state, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('address', address)
      .set('state', state)
      this.http.post(`${this.uri}/changeLocation`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }  
  saveGirlService(user_id, token, service_id, value, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('service_id', service_id)
      .set('value', value)
      this.http.post(`${this.uri}/saveGirlService`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }  
  getTopProfile(user_id, token, state, name, ageFrom, ageTo, heightFrom, heightTo, location, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('state', state)
      .set('name', name)
      .set('ageFrom', ageFrom)
      .set('ageFrom', ageFrom)
      .set('ageTo', ageTo)
      .set('heightFrom', heightFrom)
      .set('heightTo', heightTo)
      .set('location', location)
      this.http.post(`${this.uri}/getTopProfile`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }  
  getProfileList(user_id, token, state, name, ageFrom, ageTo, heightFrom, heightTo, location, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('state', state)
      .set('name', name)
      .set('ageFrom', ageFrom)
      .set('ageFrom', ageFrom)
      .set('ageTo', ageTo)
      .set('heightFrom', heightFrom)
      .set('heightTo', heightTo)
      .set('location', location)
      this.http.post(`${this.uri}/getProfileList`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }  
  getHistoryList(user_id, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      this.http.post(`${this.uri}/getHistoryList`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  }  
  getProfileImage(user_id, token, view_id, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('view_id', view_id)
      this.http.post(`${this.uri}/getProfileImage`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  } 
  goLive(user_id, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      this.http.post(`${this.uri}/goLive`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  } 
  getLiveStatus(user_id, token, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      this.http.post(`${this.uri}/getLiveStatus`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  } 
  revealContactInfo(user_id, token, view_id, callback){
    const httpBody = new HttpParams()
      .set('user_id', user_id)
      .set('view_id', view_id)
      this.http.post(`${this.uri}/goLive`, httpBody, this.getTokenHeaders(token))
      .subscribe(res=>{
        callback(res); 
      })
  } 
  uploadProfileImage(user_id, token, file, imgcode, callback){
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    uploadData.append('imgcode', imgcode);
    uploadData.append('user_id', user_id);

    this.http.post(`${this.uri}/uploadProfileImage`, uploadData, this.getImgTokenHeaders(token))
    .subscribe(res=>{
      callback(res); 
    })
  }  
}