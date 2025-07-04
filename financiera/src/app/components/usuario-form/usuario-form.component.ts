import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Rol } from '../../models/rol';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'usuario-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent  implements OnInit{

    @Input() usuario: Usuario;

    @Input() roles: Rol[]=[];

    errors: any={};

  
  
    constructor(
      private serviceR: RolService,
      private sharingData: SharingDataService,
      private route: ActivatedRoute,
      private service: UsuarioService,
    ){
        this.usuario = new Usuario();
        

    }


    ngOnInit(): void {

    this.sharingData.errorsUserFormEventEmitter.subscribe(errors=> this.errors= errors);
    console.log(this.errors);


      this.serviceR.findAll().subscribe((roles)=>{
        this.roles = roles;
      })

    this.route.paramMap.subscribe(params=>{
      const id : number = +(params.get('id') || '0');
      if(id>0){
      this.service.findById(id).subscribe(usuario=> this.usuario = usuario);
    
    }
    })
    
  }
  
    onSubmit(userForm: NgForm): void{
      if(userForm.valid){
          this.sharingData.newUserEventEmitter.emit(this.usuario);
      //console.log(this.usuario);
  
      }

    }
    onClear(userForm: NgForm):void{
      this.usuario= new Usuario();
        userForm.resetForm();
        userForm.reset();
  
    }

}
