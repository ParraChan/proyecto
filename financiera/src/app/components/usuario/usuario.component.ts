import { Component, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
    
  
    usuarios : Usuario[]= [];
  
    idUserEventEmitter = new EventEmitter();
  
    selectedUserEventEmitter = new EventEmitter();
    
    title: string= 'Listado de Usuarios';
  
    constructor(private router: Router){
      this.usuarios = this.router.getCurrentNavigation()?.extras.state!['usuarios'];
    }
  
  
    onRemoveUser(id: number):void{
      const confirmRemove =confirm('Estas seguro que deseas eliminar')
      if(confirmRemove){
    this.idUserEventEmitter.emit(id)
      }
    }
       onSelectedUser(usuario: Usuario){
        this.selectedUserEventEmitter.emit(usuario)
      }

}
