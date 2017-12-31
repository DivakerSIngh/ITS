import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../app/model/index';
import { GlobalEventsManager } from "../GlobalEventsManager";
import { AuthenticationService } from './service/index';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from './service/comman/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent {

    @ViewChild('closeBtn') closeBtn: ElementRef;
    loading = false;
    showModelPopup: boolean = true;
    model: any = {};
    showNavBar: boolean = false;
    userSession: boolean = true;
    userAccount: boolean = true;
    returnUrl: string;
    loginError: string;
    constructor(private globalEventsManager: GlobalEventsManager,
        private route: ActivatedRoute, private router: Router,
        private authenticationService: AuthenticationService,
    private loaderService:LoaderService) {
     
    }
    showLoader: boolean;
  ngOnInit(): void {
      
    this.showLoader = false;
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
  });
  }
    register() {

        this.closeBtn.nativeElement.click();
        this.router.navigate(['/user']);
    }


    login() {

        this.router.navigate(['/home']);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
        window.location.reload();
    }
    private generateToken(user: string) {

        let userJson = JSON.stringify(user)
        let usertoken = btoa(userJson);
        // atob() $.base64('encode', userJson);
        usertoken = user == null ? null : usertoken;
        return usertoken;

    }

}
