import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'cliente',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  clientes : Cliente[]= [];
  
  title: string= 'Listado de Clientes';

  clientesFiltrados: Cliente[] = [];
  
  filtroCliente: string = '';


  constructor(
    private sharingData : SharingDataService,
    private router: Router,
    private service: ClienteService,
    public authService : AuthService,
  ){

  }
   ngOnInit(): void {
    this.service.findAll()
      .pipe(take(1)) 
      .subscribe(clientes => {
        this.clientes = clientes;
        this.actualizarFiltroClientes();
      });
  }
actualizarFiltroClientes(): void {
    const filtro = this.filtroCliente.toLowerCase().trim();

    this.clientesFiltrados = this.clientes.filter(cliente =>
      Object.values(cliente).some(valor =>
        valor && valor.toString().toLowerCase().includes(filtro)
      )
    );
  }





 


  onRemoveClient(id: number):void{
    
  this.sharingData.idClientEventEmitter.emit(id)
    
  }
     onSelectedClient(cliente: Cliente){
        this.router.navigate(['/clientes/editar',cliente.id_cliente]);

    }

}
