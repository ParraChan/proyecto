import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cliente-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {

  @Input() cliente: Cliente;

  errors: any={};
  
  maxDate: string='';


  constructor(
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private service: ClienteService,
    public authService : AuthService,
    private router : Router,
  ){
    this.cliente = new Cliente();

  }
  ngOnInit(): void {
    if (!this.authService.authenticated()) {
    return;
  }
    const today = new Date();
    today.setFullYear(today.getFullYear()-16);
    this.maxDate = today.toISOString().split('T')[0];

    this.sharingData.errorsClientFormEventEmitter.subscribe(errors=> this.errors= errors);

    //this.sharingData.selectClientEventEmitter.subscribe(cliente => this.cliente = cliente);

    this.route.paramMap.subscribe(params=>{
      const id : number = +(params.get('id') || '0');
      if(id>0){
      //this.sharingData.findClientByIdEventEmitter.emit(id);
      this.service.findById(id).subscribe(cliente => this.cliente = cliente);
    }
    });
    
  }

  onSubmit(userForm: NgForm): void{
    if(userForm.valid){
        this.sharingData.newClientEventEmitter.emit(this.cliente);
   // console.log(this.cliente);

    }
  
  }
  onClear(userForm: NgForm):void{
    this.cliente= new Cliente();
      userForm.resetForm();
      userForm.reset();
      this.router.navigate(['/clientes'])

  }



}
