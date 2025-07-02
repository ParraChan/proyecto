import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'usuario-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent {

    @Input() usuario: Usuario;
  
  
    constructor(private sharingData: SharingDataService,
      private router: Router
    ){
        if(this.router.getCurrentNavigation()?.extras.state){
      this.usuario = this.router.getCurrentNavigation()?.extras.state!['usuario'];

      }else{
        this.usuario = new Usuario();
      }
    }
  
    onSubmit(userForm: NgForm): void{
      if(userForm.valid){
          this.sharingData.newUserEventEmitter.emit(this.usuario);
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
