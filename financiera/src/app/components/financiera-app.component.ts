import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { ClienteComponent } from "./cliente/cliente.component";
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'financiera-app',
  standalone: true,
  imports: [NavbarComponent,RouterOutlet ],
  templateUrl: 'financiera-app.component.html'
})
export class FinancieraAppComponent implements OnInit {

  clienteSelected: Cliente;
  clientes : Cliente[]=[];

  constructor(private service: ClienteService){
    this.clienteSelected = new Cliente();
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(clientes=> this.clientes = clientes);
  }


  addClient(cliente: Cliente){
    if(cliente.id_cliente>0){
      this.clientes= this.clientes.map(c => (c.id_cliente == cliente.id_cliente)?{... cliente}:c)
    }else{
    this.clientes =[... this.clientes, {... cliente, id_cliente: new Date().getTime()}]

    }
    this.clienteSelected = new Cliente();
  }

  removeClient(id:number):void{
    this.clientes= this.clientes.filter(cliente =>cliente.id_cliente!= id)
  }

  setSelectedClient(clienteRow: Cliente):void{
    this.clienteSelected= {... clienteRow};
  }

}
