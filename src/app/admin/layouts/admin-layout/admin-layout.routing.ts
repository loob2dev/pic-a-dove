import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AdminContactComponent } from '../../admin-contact/admin-contact.component';
import { AdminCreateFieldComponent } from '../../admin-create-field/admin-create-field.component';
import { EditAdvertiserComponents } from '../../edit-advertisers/edit-advertisers.component';
import { EditBrowsersComponent } from '../../edit-browsers/edit-browsers.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                component: DashboardComponent },
    { path: 'user-profile',             component: UserProfileComponent },
    { path: 'user-list',                component: UserListComponent },
    { path: 'admin-field',              component: AdminCreateFieldComponent },
    { path: 'admin-contact',            component: AdminContactComponent },
    { path: 'typography',               component: TypographyComponent },
    // { path: 'icons',                 component: IconsComponent },
    { path: 'maps',                     component: MapsComponent },
    { path: 'notifications',            component: NotificationsComponent },
    // { path: 'upgrade',               component: UpgradeComponent },
    { path: 'edit-advertiser/:id',      component: EditAdvertiserComponents },
    { path: 'edit-browser/:id',         component: EditBrowsersComponent }
];
