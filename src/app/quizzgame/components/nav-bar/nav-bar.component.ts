import { afterNextRender, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  showList$ = false;
  username: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    afterNextRender(() => {
      this.username = localStorage.getItem('username') || ''
    });
  }

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
    window.location.reload();
  }

  toggleDrawer() {
    this.showList$ = !this.showList$;
    const pageOptions = document.getElementById('page-options');
    if (pageOptions) {
      pageOptions.style.display = this.showList$ ? 'block' : 'none';
    }
  }

}
