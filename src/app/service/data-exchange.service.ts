import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlockScrollStrategy } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  //for notify email on connection
  private messageSource = new BehaviorSubject('Example@Examp.com');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(email: string) {
    this.messageSource.next(email)
  }

  //for loading progressbar
  private loading = new BehaviorSubject(false);
  loadingObserver = this.loading.asObservable();
  setLoading(load: boolean){
    this.loading.next(load);
  }

  //for upload dialog close
  private selectDlgSource = new BehaviorSubject(false);
  selectDlgStatus = this.selectDlgSource.asObservable();
  closedUploadDlg(close: boolean) {
    this.selectDlgSource.next(close);
  }
  //for upload dialog close
  private canceledDlgSource = new BehaviorSubject(false);
  DlgCanceled = this.canceledDlgSource.asObservable();
  cancelDlg(close: boolean) {
    this.canceledDlgSource.next(close);
  }

  //for init main page
  private navSource = new BehaviorSubject("");
  userStatus = this.navSource.asObservable();
  changeUserStatus(status: string) {
    this.navSource.next(status);
  }

  //to open view profile
  private viewPofileOpen = new BehaviorSubject("");
  viewProfileOpenObserver = this.viewPofileOpen.asObservable();
  openViewProfile(id: string){
    this.viewPofileOpen.next(id);
  } 

  //to open home page
  private homePageOpen = new BehaviorSubject(true);
  openHomePageObserver = this.homePageOpen.asObservable();
  openHomePage(open: boolean){
    this.homePageOpen.next(open);
  }

  // for change location dialog
  private changeLocationDialog = new BehaviorSubject(false);
  changeLocationObserver = this.changeLocationDialog.asObservable();
  closeChangeLocation(access: boolean){

    this.changeLocationDialog.next(access);
  }
  // for change password dialog
  private changePasswordDialog = new BehaviorSubject(false);
  changePasswordObserver = this.changePasswordDialog.asObservable();
  closeChangePassword(access: boolean){

    this.changePasswordDialog.next(access);
  }
  // for change name dialog
  private changeNameDialog = new BehaviorSubject(false);
  changeNameObserver = this.changeNameDialog.asObservable();
  closeChangeName(access: boolean){

    this.changeNameDialog.next(access);
  }
  // for change email dialog
  private changeEmailDialog = new BehaviorSubject(false);
  changeEmailObserver = this.changeEmailDialog.asObservable();
  closeChangeEmail(access: boolean){

    this.changeEmailDialog.next(access);
  }

  //go to signup
  private token = new BehaviorSubject(false);
  tokenObserver = this.token.asObservable();
  goTosign(broken: boolean){
    this.token.next(broken);
  }

  //search
  private searchStart = new BehaviorSubject(null);
  serchObserver = this.searchStart.asObservable();
  goSearch(searchKey: string){
    this.searchStart.next(searchKey);
  }

  //update thumbnail
  private thumbnail = new BehaviorSubject(false);
  changeThumbnailObserver = this.thumbnail.asObservable();
  changeThumbnail(change: boolean){
    this.thumbnail.next(change)
  }
  
  //update homepage
  private homepage = new BehaviorSubject(null);
  myStateObserver = this.homepage.asObservable();
  setState(state: string){
    this.homepage.next(state)
  }

  //update refresh edit
  private refreshEdit = new BehaviorSubject(false);
  reFreshEditObserver = this.refreshEdit.asObservable();
  refreshEditPage(refresh: boolean){
    this.refreshEdit.next(refresh)
  }

  //init username of nav
  private username = new BehaviorSubject("");
  usernameInitObserver = this.username.asObservable();
  InitUsername(username: string){
    this.username.next(username);
  }
}
