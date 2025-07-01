import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes : Cliente[]=[
    
    {
    id_cliente: 1,
    nombre: "isabel",
    apellido_paterno: "Flores",
    apellido_materno: "Martinez",
    fecha_nacimiento: "2025-07-04",
    ingresos_mensuales: 14.500

     },
     {
    id_cliente: 2,
    nombre: "isabel",
    apellido_paterno: "Flores",
    apellido_materno: "Martinez",
    fecha_nacimiento: "2025-07-04",
    ingresos_mensuales: 14.500

     },
     {
    id_cliente: 3,
    nombre: "isabel",
    apellido_paterno: "Flores",
    apellido_materno: "Martinez",
    fecha_nacimiento: "2025-07-04",
    ingresos_mensuales: 14.500

     }
    
    ];
  constructor() { }

  findAll(): Observable<Cliente[]>{
    return of(this.clientes);
  }
}
