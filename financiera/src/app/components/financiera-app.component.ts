import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { Router, RouterOutlet } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Credito } from '../models/credito';
import { CreditoService } from '../services/credito.service';

@Component({
  selector: 'financiera-app',
  standalone: true,
  imports: [NavbarComponent,RouterOutlet ],
  templateUrl: 'financiera-app.component.html'
})
export class FinancieraAppComponent implements OnInit {

  clientes : Cliente[]=[];

  usuarios: Usuario[] = [];

  creditos: Credito[] = [];

  constructor(private service: ClienteService,
    private serviceU: UsuarioService,
    private serviceC: CreditoService,
    private sharingData: SharingDataService,
    private router : Router,
    ){

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(clientes=> this.clientes = clientes);
    this.serviceU.findAll().subscribe(usuarios=> this.usuarios = usuarios);
    this.serviceC.findAll().subscribe(creditos=> this.creditos= creditos);

    this.addClient();
    this.removeClient();

    this.addUser();
    this.removeUser();

    this.addCredit();
    this.removeCredit();
  }


  addClient(){
    this.sharingData.newClientEventEmitter.subscribe(cliente=>{
       if(cliente.id_cliente>0){
      this.clientes= this.clientes.map(c => (c.id_cliente == cliente.id_cliente)?{... cliente}:c)
    }else{
    this.clientes =[... this.clientes, {... cliente, id_cliente: new Date().getTime()}]

    }
              this.router.navigate(['/clientes'],{state:{clientes: this.clientes}});

    Swal.fire({
                title: "Cliente creado",
                text: "El usuario se ha creado correctamente",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff", backdrop: `
                           rgba(0,0,123,0.4)
                           url("assets/img/cat.gif")
                           left top
                           no-repeat
                         `
            });

    })
   
  }

  removeClient():void{
    this.sharingData.idClientEventEmitter.subscribe(id =>{


                Swal.fire({
          title: "Estas seguro?",
          text: "no hay marcha atras!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, borralo"
        }).then((result) => {
          if (result.isConfirmed) {
            this.clientes= this.clientes.filter(cliente =>cliente.id_cliente!= id)
            this.router.navigate(['/actualizar'],{skipLocationChange:true}).then(()=>{
              this.router.navigate(['/clientes'],{state:{clientes: this.clientes}});
            })
            Swal.fire({
                title: "Eliminado",
                text: "El cliente se ha eliminado correctamente",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff", backdrop: `
                            rgba(0,0,123,0.4)
                            url("assets/img/SadNyan.webp")
                            left top
                            no-repeat
                          `
            });
          }
        });

            })
  
   
  }



  addUser(){

    this.sharingData.newUserEventEmitter.subscribe(usuario=>{
       if(usuario.id_usuario>0){
      this.usuarios= this.usuarios.map(u => (u.id_usuario == usuario.id_usuario)?{... usuario}:u)
      }else{
      this.usuarios =[... this.usuarios, {... usuario, id_usuario: new Date().getTime()}]
      }
              this.router.navigate(['/usuarios'],{state:{usuarios: this.usuarios}});

        Swal.fire({
                title: "Usuario creado",
                text: "El usuario se ha creado correctamente",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff", backdrop: `
                           rgba(0,0,123,0.4)
                           url("assets/img/cat.gif")
                           left top
                           no-repeat
                         `
            });


    });
   
  }

  removeUser():void{
    this.sharingData.idUserEventEmitter.subscribe(id=>{
          Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
          this.usuarios= this.usuarios.filter(Usuario =>Usuario.id_usuario!= id)
          this.router.navigate(['/actualizar'],{skipLocationChange:true}).then(()=>{
              this.router.navigate(['/usuarios'],{state:{usuarios: this.usuarios}});
            })
            Swal.fire({
                title: "Eliminado",
                text: "El usuario se ha eliminado correctamente",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff", backdrop: `
                            rgba(0,0,123,0.4)
                            url("assets/img/SadNyan.webp")
                            left top
                            no-repeat
                          `
            });
          }
        });

    })
  }

 

  addCredit(){
    this.sharingData.newCreditEventEmitter.subscribe(credito=>{
       if(credito.id_credito>0){
      this.creditos= this.creditos.map(cr => (cr.id_credito == credito.id_credito)?{... credito}:cr)
    }else{
    this.creditos =[... this.creditos, {... credito, id_credito: new Date().getTime()}]
    }
              this.router.navigate(['/creditos'],{state:{creditos: this.creditos}});

     Swal.fire({
                title: "Credito creado",
                text: "El usuario se ha creado correctamente",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff", backdrop: `
                           rgba(0,0,123,0.4)
                           url("assets/img/cat.gif")
                           left top
                           no-repeat
                         `
            });
    })
  }

  removeCredit(){
    this.sharingData.idCreditEventEmitter.subscribe(id=>{

           Swal.fire({
          title: "Estas seguro?",
          text: "no hay marcha atras!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, borralo"
        }).then((result) => {
          if (result.isConfirmed) {
            this.creditos= this.creditos.filter(credito =>credito.id_credito!= id)
            this.router.navigate(['/actualizar'],{skipLocationChange:true}).then(()=>{
              this.router.navigate(['/creditos'],{state:{creditos: this.creditos}});
            })
            Swal.fire({
                title: "Eliminado",
                text: "El credito se ha eliminado correctamente",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff", backdrop: `
                            rgba(0,0,123,0.4)
                            url("assets/img/SadNyan.webp")
                            left top
                            no-repeat
                          `
            });
          }
        });

    })
  }





}
