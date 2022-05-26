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

  constructor(private router: Router){

    router.events.subscribe(event => {
      if(event instanceof NavigationStart){
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
}
