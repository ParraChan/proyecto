import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  usuario : Usuario;

  constructor(){
    this.usuario= new Usuario();
  }

  onSubmit(){
    if(!this.usuario.nombreusuario || !this.usuario.contrasena){
      Swal.fire(
        'Error en la validacion',
        'Nombre de usuario y contraseña requeridos',
        'error'
      );
    }else{
      console.log(this.usuario);
    }
  }

}
