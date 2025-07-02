import { Component, EventEmitter } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html'
})
export class ClienteComponent {

  clientes : Cliente[]= [];
  
  title: string= 'Listado de Clientes';

  constructor(
    private sharingData : SharingDataService,
    private router: Router,
    private service: ClienteService,
  ){
    if(this.router.getCurrentNavigation()?.extras.state){
    this.clientes = this.router.getCurrentNavigation()?.extras.state!['clientes'];

    }else{
      this.service.findAll().subscribe( clientes => this.clientes= clientes);
    }
  }


  onRemoveClient(id: number):void{
    
  this.sharingData.idClientEventEmitter.emit(id)
    
  }
     onSelectedClient(cliente: Cliente){
      this.sharingData.selectedClientEventEmitter.emit(cliente)
    }

}
