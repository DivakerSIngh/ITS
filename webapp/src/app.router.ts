import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../src/app/login/login.component'
import { AppComponent } from '../src/app/app.component';
import { DashboardComponent } from '../src/app/dashboard/dashboard.component';
import{MemberComponent} from '../src/app/member/member.component';
import{TaskComponent} from '../src/app/task/task.component';
import{RfiComponent} from '../src/app/rfi/rfi.component';
import{ProjectComponent} from '../src/app/project/project.component';
import { HomeComponent } from '../src/app/home/home.component';
import { IssueComponent } from '../src/app/issue/issue.component';
import { ChartComponent } from '../src/app/chart/chart.component';

export const router: Routes = [


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, //canActivate: [AuthGuard],
    children: [
      {path: '',component: DashboardComponent},
      {path: 'index',component: DashboardComponent},
      { path: 'task', component: TaskComponent },
       { path: 'project', component: ProjectComponent },
      { path: 'rfi', component: RfiComponent },
       { path: 'member', component: MemberComponent },
       { path: 'issue', component: IssueComponent },
       { path: 'chart', component: ChartComponent },
       
    ]
  },
//   { path: 'forgot', component: ForgotpassComponent }, 
//   {path: 'reset-password/:token', component: ResetPasswordComponent}
  { path: '**', component: LoginComponent }
];


export const routes: ModuleWithProviders = RouterModule.forRoot(router);