import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Checks if path is the same as the current URL and returns true or false
  isActive(path: string) {
    return path === this.router.url;
  }

}
