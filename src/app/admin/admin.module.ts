import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTING } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableModule } from '@angular/material/table'
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog'
import { ChangePasswordPopupComponent } from './change-password-popup/change-password-popup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component'
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MessageComponent } from './message/message.component';
import { ScreenContentComponent } from './screen-content/screen-content.component';
import { AddScreenComponent } from './add-screen/add-screen.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTING),
    FormsModule,
    ReactiveFormsModule,
    SharedModule, 
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    NgbCarouselModule,
    CarouselModule,
    MatInputModule, MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule 

     

  ],
  declarations: [
    ContentLayoutComponent,
    DashboardComponent,
    UserManagementComponent,
    ChangePasswordPopupComponent,
    UserDetailsComponent,
    WelcomeScreenComponent,
    MessageComponent,
    ScreenContentComponent,
    AddScreenComponent,

  ],
 
})
export class AdminModule { }
