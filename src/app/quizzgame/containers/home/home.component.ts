import { Component, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  logged: Boolean = false;

  constructor(private router: Router) {

    afterNextRender(() => {
      if(localStorage.getItem('token') == null){
        this.logged = false
        this.router.navigate(['']);
      }
      else{
        this.logged = true
      }
    });
  }
}
