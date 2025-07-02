import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { Usuario } from '../../models/usuario';
import { Credito } from '../../models/credito';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() clientes: Cliente[]=[];

  @Input() usuarios: Usuario[]=[];

  @Input() creditos: Credito[]=[];

}
