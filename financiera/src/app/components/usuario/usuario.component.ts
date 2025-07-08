import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'usuario',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
    
  
    usuarios : Usuario[]= [];

   // rolUsuario: string | null=null;
  

    title: string= 'Listado de Usuarios';
  
    constructor(private router: Router,
      private sharingData: SharingDataService,
      private service: UsuarioService,
      public authService : AuthService,
    ){}

  ngOnInit(): void {
    //this.rolUsuario = this.authService.rol;
   // console.log('ROL:', this.authService.rol);
        this.service.findAll().subscribe(usuarios=> this.usuarios= usuarios);

  }
  
    onRemoveUser(id: number):void{
    this.sharingData.idUserEventEmitter.emit(id)
    }
       onSelectedUser(usuario: Usuario){
        this.router.navigate(['/usuarios/editar',usuario.id_usuario]);
      }

    

}
