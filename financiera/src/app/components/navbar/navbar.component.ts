import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  
  constructor(public authService : AuthService,
    private router: Router,
    

  ){}

  get login(){
    return this.authService.usuario;
  }

  handlerLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
