import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html'
})
export class ClienteComponent {

  @Input() clientes : Cliente[]= [];

  @Output() idClientEventEmitter = new EventEmitter();


  onRemoveClient(id: number):void{
    const confirmRemove =confirm('Estas seguro que deseas eliminar')
    if(confirmRemove){
  this.idClientEventEmitter.emit(id)
    }
   
  }

}
