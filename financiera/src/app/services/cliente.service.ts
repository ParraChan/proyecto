import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes : Cliente[]=[];
  constructor(private http: HttpClient) { }

  findAll(): Observable<Cliente[]>{
    //return of(this.clientes);
    return this.http.get('http://localhost:8080/api/clientes').pipe(
      map((clientes: any)=>clientes as Cliente[]),
    );
  }
}
/*
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
*/
