import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Join';

  constructor(private router: Router){    
  }

  checkUrl() {   
    let url = this.router.url;
    if(url == '/board' || url == '/backlog' || url == '/addtask' || url == '/trash'){
      return true;
    }
    return false;
  }
}
