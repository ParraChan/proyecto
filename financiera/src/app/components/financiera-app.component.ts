import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { ClienteComponent } from "./cliente/cliente.component";
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

@Component({
  selector: 'financiera-app',
  standalone: true,
  imports: [NavbarComponent, ClienteComponent, ClienteComponent,ClienteFormComponent],
  templateUrl: 'financiera-app.component.html'
})
export class FinancieraAppComponent implements OnInit {

  clientes : Cliente[]=[];

  constructor(private service: ClienteService){

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(clientes=> this.clientes = clientes);
  }


  addClient(cliente: Cliente){
    this.clientes =[... this.clientes, {... cliente, id_cliente: new Date().getTime()}]
  }

  removeClient(id:number):void{
    this.clientes= this.clientes.filter(cliente =>cliente.id_cliente!= id)
  }

}
