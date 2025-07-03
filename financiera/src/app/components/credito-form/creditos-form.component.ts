import { Component, Input, OnInit } from '@angular/core';
import { SharingDataService } from '../../services/sharing-data.service';
import { Credito } from '../../models/credito';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreditoService } from '../../services/credito.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-creditos-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './creditos-form.component.html'
})
export class CreditosFormComponent implements OnInit {

  @Input() credito: Credito;

  @Input() clientes: Cliente[]=[];

  constructor(
    private serviceC: ClienteService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private service: CreditoService,){
        this.credito = new Credito();
    }
  ngOnInit(): void {
    
    this.serviceC.findAll().subscribe((clientes)=>{
      this.clientes = clientes;
    })

    this.route.paramMap.subscribe(params=>{
      const id : number = +(params.get('id') || '0');
      if(id>0){
     this.service.findById(id).subscribe(credito => this.credito = credito)
    }
    })
    
  }

  onSubmit(userForm: NgForm):void{
    if(userForm.valid){
      this.sharingData.newCreditEventEmitter.emit(this.credito);
      console.log(this.credito);
    }
    userForm.resetForm();
    userForm.reset();
  }

  onClear(userForm: NgForm):void{
    this.credito = new Credito();
    userForm.resetForm();
    userForm.reset();
  }

}
