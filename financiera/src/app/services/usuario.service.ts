import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios : Usuario[] = [];

  constructor(private http: HttpClient) { }


  private url: string = 'http://localhost:8080/api/usuarios' 
    
  
  //findAll(): Observable<Usuario[]>{
    //  return this.http.get<Usuario[]>(this.url);
  // }

   findAll(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.url).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn('Acceso denegado: no tienes permisos para ver los usuarios.');
        return of([]); 
      }
      throw error; 
    })
  );
}

   findById(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/${id}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`Acceso denegado al usuario con ID ${id}`);
        return of(null as any);
      }
      throw error;
    })
  );
   }

    create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url,usuario).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn('No tienes permisos para crear usuarios.');
        return of(null as any);
      }
      throw error;
    })
  );
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.url}/${usuario.idUsuario}`,usuario).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`No tienes permisos para actualizar el usuarios con ID ${usuario.idUsuario}.`);
        return of(null as any);
      }
      throw error;
    })
  );
  }

  remove(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`No tienes permisos para eliminar el usuario con ID ${id}.`);
        return of(undefined);
      }
      throw error;
    })
  );

  }

  findByUsername(username: string): Observable<Usuario> {
  return this.http.get<Usuario>(`${this.url}/usuario/${username}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`Acceso denegado al usuario con username: ${username}`);
        return of(null as any); 
      }
      throw error;
    })
  );
}


   
}
