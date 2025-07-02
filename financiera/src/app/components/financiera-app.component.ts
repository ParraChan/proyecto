import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { RouterOutlet } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'financiera-app',
  standalone: true,
  imports: [NavbarComponent,RouterOutlet ],
  templateUrl: 'financiera-app.component.html'
})
export class FinancieraAppComponent implements OnInit {

  clienteSelected: Cliente;
  clientes : Cliente[]=[];

  usuarioSelected: Usuario;
  usuarios: Usuario[] = [];

  constructor(private service: ClienteService,
    private serviceU: UsuarioService,
    private sharingData: SharingDataService,
    ){
    this.clienteSelected = new Cliente();
    this.usuarioSelected= new Usuario();
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(clientes=> this.clientes = clientes);
    this.serviceU.findAll().subscribe(usuarios=> this.usuarios = usuarios);
    this.addClient();
    this.removeClient();
    this.setSelectedClient();
  }


  addClient(){
    this.sharingData.newClientEventEmitter.subscribe(cliente=>{
       if(cliente.id_cliente>0){
      this.clientes= this.clientes.map(c => (c.id_cliente == cliente.id_cliente)?{... cliente}:c)
    }else{
    this.clientes =[... this.clientes, {... cliente, id_cliente: new Date().getTime()}]

    }
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
    this.clienteSelected = new Cliente();

    })
   
  }

  removeClient():void{
    this.sharingData.idClientEventEmitter.subscribe(id =>{


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
            this.clientes= this.clientes.filter(cliente =>cliente.id_cliente!= id)
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

  setSelectedClient():void{
    this.sharingData.selectedClientEventEmitter.subscribe(clienteRow=>{
      this.clienteSelected= {... clienteRow};
    })
    
  }

  addUser(usuario: Usuario){
    if(usuario.id_usuario>0){
      this.usuarios= this.usuarios.map(u => (u.id_usuario == usuario.id_usuario)?{... usuario}:u)
    }else{
    this.usuarios =[... this.usuarios, {... usuario, id_usuario: new Date().getTime()}]

    }
    this.usuarioSelected = new Usuario();
  }

  removeUser(id:number):void{
    this.usuarios= this.usuarios.filter(Usuario =>Usuario.id_usuario!= id)
  }

  setSelectedUser(userRow: Usuario):void{
    this.usuarioSelected= {... userRow};
  }



}
