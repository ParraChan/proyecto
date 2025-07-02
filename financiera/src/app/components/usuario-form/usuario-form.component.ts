import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'usuario-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent {

    @Input() usuario: Usuario;
  
    @Output() newUserEventEmitter: EventEmitter<Usuario>= new EventEmitter();
  
    constructor(){
      this.usuario = new Usuario();
    }
  
    onSubmit(userForm: NgForm): void{
      if(userForm.valid){
          this.newUserEventEmitter.emit(this.usuario);
      console.log(this.usuario);
  
      }
    
      userForm.resetForm();
      userForm.reset();
    }
    onClear(userForm: NgForm):void{
      this.usuario= new Usuario();
        userForm.resetForm();
        userForm.reset();
  
    }

}
