import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cliente',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  clientes : Cliente[]= [];
  
  title: string= 'Listado de Clientes';

  constructor(
    private sharingData : SharingDataService,
    private router: Router,
    private service: ClienteService,
    public authService : AuthService,
  ){

  }
  ngOnInit(): void {
    
  if (!this.authService.authenticated()) {
    return;
  }
    console.log('consulta findall');
      this.service.findAll().subscribe( clientes => this.clientes= clientes);

  }


  onRemoveClient(id: number):void{
    
  this.sharingData.idClientEventEmitter.emit(id)
    
  }
     onSelectedClient(cliente: Cliente){
        this.router.navigate(['/clientes/editar',cliente.id_cliente]);

    }

}
