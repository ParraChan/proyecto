import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'cliente-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {

  @Input() cliente: Cliente;

  errors: any={};


  constructor(
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private service: ClienteService,
  ){
    this.cliente = new Cliente();

  }
  ngOnInit(): void {

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
  
    userForm.resetForm();
    userForm.reset();
  }
  onClear(userForm: NgForm):void{
    this.cliente= new Cliente();
      userForm.resetForm();
      userForm.reset();

  }



}
