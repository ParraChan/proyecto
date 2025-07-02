import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cliente-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent {

  @Input() cliente: Cliente;


  constructor(private sharingData : SharingDataService,
    private router: Router,
  ){
    if(this.router.getCurrentNavigation()?.extras.state){
    this.cliente = this.router.getCurrentNavigation()?.extras.state!['cliente'];

    }else{
    this.cliente = new Cliente();

    }
  }

  onSubmit(userForm: NgForm): void{
    if(userForm.valid){
        this.sharingData.newClientEventEmitter.emit(this.cliente);
    console.log(this.cliente);

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
