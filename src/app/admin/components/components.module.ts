import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { navbar_aComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    navbar_aComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    navbar_aComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
