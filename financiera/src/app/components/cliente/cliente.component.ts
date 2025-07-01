import { Component, EventEmitter } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html'
})
export class ClienteComponent {

  clientes : Cliente[]= [];

   idClientEventEmitter = new EventEmitter();

  selectedClientEventEmitter = new EventEmitter();
  
  title: string= 'Listado de Clientes';

  constructor(private router: Router){
    this.clientes = this.router.getCurrentNavigation()?.extras.state!['clientes'];
  }


  onRemoveClient(id: number):void{
    const confirmRemove =confirm('Estas seguro que deseas eliminar')
    if(confirmRemove){
  this.idClientEventEmitter.emit(id)
    }
  }
     onSelectedClient(cliente: Cliente){
      this.selectedClientEventEmitter.emit(cliente)
    }

}
