import { Component, afterNextRender } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './quizzgame/services/login.service';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'quizzgameadmin';
  logged: Boolean = false;
  user: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    afterNextRender(() => {
      if(localStorage.getItem('token') == null){
        this.logged = false
      }
      else{
        this.logged = true
      }
    });

  }

  login(){
    this.loginService.login(this.user, this.password).subscribe(
      (result) => this.goToHome(result),
      (error) => this.onError('Erro ao efetuar login. Verifique suas credenciais')
    );
  }

  goToHome(token: any){
    localStorage.setItem('token', JSON.stringify(token).substring(10, JSON.stringify(token).length -2))
    this.logged = true
    this.router.navigate(['home'], {relativeTo: this.route});
    this.user = ''
    this.password = ''
  }

  onError(msg: string) {
    this.snackBar.open(msg, 'Fechar', { duration: 5000 });
  }

  onWarning(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg,
    });
  }
}
