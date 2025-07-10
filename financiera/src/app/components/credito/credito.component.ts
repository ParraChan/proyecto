import { Component, OnInit } from '@angular/core';
import { Credito } from '../../models/credito';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router, RouterModule } from '@angular/router';
import { CreditoService } from '../../services/credito.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'credito',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './credito.component.html'
})
export class CreditoComponent implements OnInit {
    creditos : Credito[]= [];
    
    title: string= 'Listado de Creditos';
  
    constructor(
      private sharingData : SharingDataService,
      private router: Router,
      private service: CreditoService,
      private serviceU: UsuarioService,
      public authService: AuthService,
    ){}
      
  ngOnInit(): void {
     if (!this.authService.authenticated()) {
    return; 
  }
       if (this.authService.rol === 'ROLE_ASESOR') {
        
  const asesor = this.authService.asesor;
  console.log("Username desde token:", asesor);
  if(asesor){
    this.serviceU.findByUsername(asesor).subscribe(usuario=>{
      console.log("USUARIO: ",usuario)
      //this.authService.asesorLog=usuario;
      const idAsesor = usuario.idUsuario;
      console.log("ASESOR: ",idAsesor)
      this.service.findByAsesorId(idAsesor).subscribe(
        creditos=>this.creditos=creditos
      );
    });
  }
} else {
  this.service.findAll().subscribe((creditos) => {
      
    (this.creditos = creditos)
  console.log("CREDITOS : ",this.creditos)

  });
}

    
  }
  
    onRemoveCredit(id: number):void{
      
    this.sharingData.idCreditEventEmitter.emit(id)
      
    }
       onSelectedCredit(credito: Credito){
        this.router.navigate(['/creditos/editar',credito.id_credito]);
      }

}
