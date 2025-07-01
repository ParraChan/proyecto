import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() clientes: Cliente[]=[];

}
