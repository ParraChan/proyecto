import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios : Usuario[] = [];

  constructor(private http: HttpClient) { }


  private url: string = 'http://localhost:8080/api/usuarios' 
    
  
  findAll(): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.url);
   }

   findById(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/${id}`);
   }

    create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url,usuario);
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.url}/${usuario.id_usuario}`,usuario);
  }

  remove(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)

  }

   
}
