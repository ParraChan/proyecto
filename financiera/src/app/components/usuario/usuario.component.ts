import { Component, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'usuario',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
    
  
    usuarios : Usuario[]= [];
  

    title: string= 'Listado de Usuarios';
  
    constructor(private router: Router,
      private sharingData: SharingDataService,
      private service: UsuarioService,
    ){
      if(this.router.getCurrentNavigation()?.extras.state){
      this.usuarios = this.router.getCurrentNavigation()?.extras.state!['usuarios'];

      }else{
        this.service.findAll().subscribe(usuarios=> this.usuarios= usuarios);
      }

    }
  
    onRemoveUser(id: number):void{
    this.sharingData.idUserEventEmitter.emit(id)
    }
       onSelectedUser(usuario: Usuario){
        this.router.navigate(['/usuarios/editar',usuario.id_usuario],{state: {usuario}});
      }

}
