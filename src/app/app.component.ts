import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Join';

  loading = true;
  mobileView! :boolean;
  expandMobileMenu!: boolean;

  constructor(private router: Router, public responsive: BreakpointObserver){

    this.responsive.observe([
      Breakpoints.HandsetPortrait, 
      Breakpoints.HandsetLandscape])
      .subscribe(result => {
        if(result.matches) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }

      })

    router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        if(this.expandMobileMenu){
          this.expandMobileMenu = false;
        }
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    })
  }

  checkUrl() {   
    let url = this.router.url;
    if(url != ''){
      return true;
    }
    return false;
  }

  showMobileMenu() {
    if(!this.expandMobileMenu){
      this.expandMobileMenu = true;
    } else {
      this.expandMobileMenu = false;
    }
  }
}
