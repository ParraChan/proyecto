import { Component, Input, OnInit } from '@angular/core';
import { SharingDataService } from '../../services/sharing-data.service';
import { Credito } from '../../models/credito';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditoService } from '../../services/credito.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-creditos-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './creditos-form.component.html'
})
export class CreditosFormComponent implements OnInit {

  @Input() credito: Credito;

  @Input() clientes: Cliente[]=[];

  @Input() usuarios: Usuario[]=[];

  errors: any={};

  estatusPagoOptions: string[] = ['Pagado', 'Pendiente'];
  frecuenciaPagoOptions: string[] = ['semanal', 'quincenal', 'mensual'];
  numeroPagoOptions: string[] = ['10', '12', '16', '24'];

  

  constructor(
    private serviceC: ClienteService,
    private serviceU: UsuarioService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private service: CreditoService,
    private router: Router,
  ){
        this.credito = new Credito();
    }
  ngOnInit(): void {

    this.sharingData.errorsCreditFormEventEmitter.subscribe(errors=> this.errors= errors);

    
    this.serviceC.findAll().subscribe((clientes)=>{
      this.clientes = clientes;
    })
    this.serviceU.findAll().subscribe((usuarios)=>{
      this.usuarios = usuarios.filter(usuario=>usuario.puesto?.id_rol===3);
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
      //console.log(this.credito);
    }
  }

  onClear(userForm: NgForm):void{
    this.credito = new Credito();
    userForm.resetForm();
    userForm.reset();
     this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/creditos']);
            })
  }

}
