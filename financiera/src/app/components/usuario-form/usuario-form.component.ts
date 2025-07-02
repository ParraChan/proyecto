import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'usuario-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent  implements OnInit{

    @Input() usuario: Usuario;
  
  
    constructor(private sharingData: SharingDataService,
      private route: ActivatedRoute,
    ){
        this.usuario = new Usuario();

    }


    ngOnInit(): void {

    this.sharingData.selectUserEventEmitter.subscribe(usuario => this.usuario = usuario);


    this.route.paramMap.subscribe(params=>{
      const id : number = +(params.get('id') || '0');
      if(id>0){
      this.sharingData.findUserByIdEventEmitter.emit(id);
    }
    })
    
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
