import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AdminCreateFieldComponent } from '../../admin-create-field/admin-create-field.component';
import { AdminContactComponent } from '../../admin-contact/admin-contact.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatCardModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { EditBrowsersComponent } from '../../edit-browsers/edit-browsers.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxEditorModule } from 'ngx-editor';
import { EditAdvertiserComponents } from '../../edit-advertisers/edit-advertisers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'GoogleMap API KEY',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
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
    MatMenuModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AdminCreateFieldComponent,
    AdminContactComponent,
    EditAdvertiserComponents,
    EditBrowsersComponent
  ]
})

export class AdminLayoutModule {}
