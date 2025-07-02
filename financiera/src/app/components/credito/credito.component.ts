import { Component } from '@angular/core';
import { Credito } from '../../models/credito';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'credito',
  standalone: true,
  imports: [],
  templateUrl: './credito.component.html'
})
export class CreditoComponent {
    creditos : Credito[]= [];
    
    title: string= 'Listado de Creditos';
  
    constructor(
      private sharingData : SharingDataService,
      private router: Router,
      private serviceC: Credito,
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
