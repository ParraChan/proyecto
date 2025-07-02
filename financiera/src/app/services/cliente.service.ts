import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes : Cliente[]=[];

  private url: string = 'http://localhost:8080/api/clientes' 
  constructor(private http: HttpClient) { }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url)
    
  }

  findById(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`);

  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.url,cliente);
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${cliente.id_cliente}`,cliente);
  }

  remove(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)

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
