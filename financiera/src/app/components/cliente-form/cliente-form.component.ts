import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'cliente-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent {

  @Input() cliente: Cliente;

  @Output() newClientEventEmitter: EventEmitter<Cliente>= new EventEmitter();

  constructor(){
    this.cliente = new Cliente();
  }

  onSubmit(userForm: NgForm): void{
    if(userForm.valid){
        this.newClientEventEmitter.emit(this.cliente);
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
