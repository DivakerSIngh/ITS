import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from '../app.router';
import { AppComponent } from './app.component';
import{DashboardComponent}  from './dashboard/dashboard.component'
// import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { GlobalEventsManager } from '../GlobalEventsManager';
import { AlertService, AuthenticationService, UserService } from './service/index';
import { ApplicationHeader} from './service/Base.Service';
import { MemberComponent } from './member/member.component';
import { TaskComponent } from './task/task.component';
import { RfiComponent } from './rfi/rfi.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './issue/issue.component';
import { ChartComponent } from './chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import{LoaderService} from './service/comman/loader.service';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
     LoginComponent,    
      DashboardComponent,
      MemberComponent,
      TaskComponent,
      RfiComponent,
      ScheduleComponent,
      IndexComponent,
      HomeComponent,
      ProjectComponent,
      IssueComponent,
      ChartComponent
       
  ],
  imports: [
    BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      HttpModule,
      routes,
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatStepperModule,
      
      // AgmCoreModule.forRoot({
      //     apiKey: 'AIzaSyBlvmXi0cL76v48MHEAZDAyAPRU94ZCWOE'
      // })
  ],
  providers: [AuthenticationService,
    LoaderService, ApplicationHeader,
    UserService, AlertService,
     GlobalEventsManager
  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
