import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onHome() {
    this.router.navigate(['home']);
  }

  onCategory() {
    this.router.navigate(['category']);
  }

  onLevel() {
    this.router.navigate(['level']);
  }

  onQuestion() {
    this.router.navigate(['question']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
