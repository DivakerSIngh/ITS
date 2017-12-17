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
import { ChartsModule } from 'ng2-charts';
import{LoaderService} from './service/comman/loader.service';




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
      HttpModule,
      routes,
      ChartsModule
      // AgmCoreModule.forRoot({
      //     apiKey: 'AIzaSyBlvmXi0cL76v48MHEAZDAyAPRU94ZCWOE'
      // })
  ],
  providers: [AuthenticationService,LoaderService, ApplicationHeader,UserService, AlertService, GlobalEventsManager
  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
