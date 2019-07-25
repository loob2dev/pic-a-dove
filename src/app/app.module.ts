import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCardModule, MatNativeDateModule } from '@angular/material';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';

import { UsersService } from './service/users.service';
import { DataExchangeService } from './service/data-exchange.service';

import { UiSwitchModule } from 'ngx-toggle-switch';

import { MatMenuModule} from '@angular/material/menu';
import { MatCarouselModule} from '@ngmodule/material-carousel';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import {AgmCoreModule} from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { AppComponent } from './app.component'; 
import { VerificationComponent } from './verification/verification.component';
import { SignComponent } from './connect/sign/sign.component';
import { MainComponent } from './pickadove/main/main.component';
import { LiveComponent } from './pickadove/sub_bars/live/live.component';
import { NavigationComponent } from './pickadove/sub_bars/navigation/navigation.component';
import { LiveStatusComponent } from './pickadove/sub_bars/live-status/live-status.component';
import { EditComponent } from './pickadove/nav_contents/edit/edit.component';
import { PreviewComponent } from './pickadove/nav_contents/preview/preview.component';
import { PaymentComponent } from './pickadove/nav_contents/payment/payment.component';
import { AvatarUploadComponent } from './pickadove/nav_contents/edit/avatar-upload/avatar-upload.component';
import { SelectImageDialogComponent } from './pickadove/nav_contents/edit/select-image-dialog/select-image-dialog.component';
import { WorkHourComponent } from './pickadove/nav_contents/edit/work-hour/work-hour.component';
import { ChangeInfoComponent } from './pickadove/nav_contents/edit/change-info/change-info.component';
import { EditInfoComponent } from './pickadove/nav_contents/edit/edit-info/edit-info.component';
import { ServiceSelectionComponent } from './pickadove/nav_contents/edit/service-selection/service-selection.component';
import { AboutMeComponent } from './pickadove/nav_contents/edit/about-me/about-me.component';
import { PhotoGalleryComponent } from './pickadove/nav_contents/edit/photo-gallery/photo-gallery.component';
import { CommentsComponent } from './pickadove/nav_contents/edit/comments/comments.component';
import { NgxEditorModule } from 'ngx-editor';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TabModule } from 'angular-tabs-component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CommentsChatComponent } from './pickadove/nav_contents/edit/comments/comments-chat/comments-chat.component';
import { CommentsComplainComponent } from './pickadove/nav_contents/edit/comments/comments-complain/comments-complain.component';
import { PreviewAvatarComponent } from './pickadove/nav_contents/preview/preview-avatar/preview-avatar.component';
import { PreviewWorkHourComponent } from './pickadove/nav_contents/preview/preview-work-hour/preview-work-hour.component';
import { PreviewPersionalInfoComponent } from './pickadove/nav_contents/preview/preview-persional-info/preview-persional-info.component';
import { PreviewProfileDetailsComponent } from './pickadove/nav_contents/preview/preview-profile-details/preview-profile-details.component';
import { PreviewImageGalleryComponent } from './pickadove/nav_contents/preview/preview-image-gallery/preview-image-gallery.component';
import { PreviewCommentsComponent } from './pickadove/nav_contents/preview/preview-comments/preview-comments.component';
import { PreviewCommentsChatComponent } from './pickadove/nav_contents/preview/preview-comments/preview-comments-chat/preview-comments-chat.component';
import { PreviewCommentsComplaintsComponent } from './pickadove/nav_contents/preview/preview-comments/preview-comments-complaints/preview-comments-complaints.component';
import { HomeComponent } from './pickadove/home/home.component';
import { HomeSearchHereComponent } from './pickadove/home/home-search-here/home-search-here.component';
import { HomeReportComponent } from './pickadove/home/home-report/home-report.component';
import { HomeTopProfileComponent } from './pickadove/home/home-top-profile/home-top-profile.component';
import { HomeGalleryComponent } from './pickadove/home/home-gallery/home-gallery.component';
import { HomeLockComponent } from './pickadove/home/home-lock/home-lock.component';
import { HomeRecentProfilesComponent } from './pickadove/home/home-recent-profiles/home-recent-profiles.component';
import { ViewProfileComponent } from './pickadove/view-profile/view-profile.component';
import { ViewProfileAvatarComponent } from './pickadove/view-profile/view-profile-avatar/view-profile-avatar.component';
import { ViewProfileCommentsComponent } from './pickadove/view-profile/view-profile-comments/view-profile-comments.component';
import { ViewProfileImageGalleryComponent } from './pickadove/view-profile/view-profile-image-gallery/view-profile-image-gallery.component';
import { ViewProfilePersionalInfoComponent } from './pickadove/view-profile/view-profile-persional-info/view-profile-persional-info.component';
import { ViewProfileProfileDetailsComponent } from './pickadove/view-profile/view-profile-profile-details/view-profile-profile-details.component';
import { ViewProfileWorkHourComponent } from './pickadove/view-profile/view-profile-work-hour/view-profile-work-hour.component';
import { ViewProfileCommentsChatComponent } from './pickadove/view-profile/view-profile-comments/view-profile-comments-chat/view-profile-comments-chat.component';
import { ViewProfileCommentsComplaintsComponent } from './pickadove/view-profile/view-profile-comments/view-profile-comments-complaints/view-profile-comments-complaints.component';
import { SplashScreenComponent } from './pickadove/splash-screen/splash-screen.component';
import { ChangeLocationDialogComponent } from './pickadove/nav_contents/edit/change-info/change-location-dialog/change-location-dialog.component';
import { PickadoveComponent } from './pickadove/pickadove.component';


import { ComponentsModule } from './admin/components/components.module';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import {NgxPopperModule} from 'ngx-popper';
import { DragulaModule } from 'ng2-dragula';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';

import * as $ from "jquery";
import { ConnectComponent } from './connect/connect.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ErrorComponent } from './error/error.component';
import { ChangePassDialogComponent } from './pickadove/nav_contents/edit/change-info/change-pass-dialog/change-pass-dialog.component';
import { ChangeNameDialogComponent } from './pickadove/nav_contents/edit/change-info/change-name-dialog/change-name-dialog.component';
import { ChangeEmailDialogComponent } from './pickadove/nav_contents/edit/change-info/change-email-dialog/change-email-dialog.component';

import { CarouselModule, WavesModule } from 'angular-bootstrap-md'

import {ToastrModule} from 'ngx-toastr'

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    VerificationComponent,
    SignComponent,
    MainComponent,
    LiveComponent,
    NavigationComponent,
    LiveStatusComponent,
    EditComponent,
    PreviewComponent,
    PaymentComponent,
    AvatarUploadComponent,
    SelectImageDialogComponent,
    WorkHourComponent,
    ChangeInfoComponent,
    EditInfoComponent,
    ServiceSelectionComponent,
    AboutMeComponent,
    PhotoGalleryComponent,
    CommentsComponent,
    CommentsChatComponent,
    CommentsComplainComponent,
    PreviewAvatarComponent,
    PreviewWorkHourComponent,
    PreviewPersionalInfoComponent,
    PreviewProfileDetailsComponent,
    PreviewImageGalleryComponent,
    PreviewCommentsComponent,
    PreviewCommentsChatComponent,
    PreviewCommentsComplaintsComponent,
    HomeComponent,
    HomeSearchHereComponent,
    HomeReportComponent,
    HomeTopProfileComponent,
    HomeGalleryComponent,
    HomeLockComponent,
    HomeRecentProfilesComponent,
    ViewProfileComponent,
    ViewProfileAvatarComponent,
    ViewProfileCommentsComponent,
    ViewProfileImageGalleryComponent,
    ViewProfilePersionalInfoComponent,
    ViewProfileProfileDetailsComponent,
    ViewProfileWorkHourComponent,
    ViewProfileCommentsChatComponent,
    ViewProfileCommentsComplaintsComponent,
    SplashScreenComponent,
    ChangeLocationDialogComponent,
    PickadoveComponent,
    AdminLayoutComponent,
    ConnectComponent,
    ChangePasswordComponent,
    ErrorComponent,
    ChangePassDialogComponent,
    ChangeNameDialogComponent,
    ChangeEmailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    MatDialogModule, 
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    UiSwitchModule,
    NgxEditorModule,
    MatCardModule,
    ScrollingModule,
    MDBBootstrapModule.forRoot(),
    TabModule,
    PickerModule,
    MatMenuModule,
    MatCarouselModule,
    SwiperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCU3muwvFK7AveAzw5B8cXSj5yGBp250y4',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    FlexLayoutModule,
    ComponentsModule,
    NgxPopperModule,
    DragulaModule.forRoot(),
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true
    }),
    CarouselModule,
    WavesModule
  ],
  providers: [
    UsersService,
    DataExchangeService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  entryComponents: [
    SelectImageDialogComponent,
    ChangeLocationDialogComponent,
    ChangePassDialogComponent,
    ChangeNameDialogComponent,
    ChangeEmailDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
