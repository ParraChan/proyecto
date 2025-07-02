import { Component } from '@angular/core';
import { Credito } from '../../models/credito';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router, RouterModule } from '@angular/router';
import { CreditoService } from '../../services/credito.service';

@Component({
  selector: 'credito',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './credito.component.html'
})
export class CreditoComponent {
    creditos : Credito[]= [];
    
    title: string= 'Listado de Creditos';
  
    constructor(
      private sharingData : SharingDataService,
      private router: Router,
      private service: CreditoService,
    ){
      if(this.router.getCurrentNavigation()?.extras.state){
      this.creditos = this.router.getCurrentNavigation()?.extras.state!['creditos'];
  
      }else{
        this.service.findAll().subscribe( creditos => this.creditos= creditos);
      }
    }
  
    onRemoveCredit(id: number):void{
      
    this.sharingData.idCreditEventEmitter.emit(id)
      
    }
       onSelectedCredit(credito: Credito){
        this.router.navigate(['/creditos/editar',credito.id_credito],{state: {credito}});
      }

}
