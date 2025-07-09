import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes : Cliente[]=[];

  private url: string = 'http://localhost:8080/api/clientes' 
  constructor(private http: HttpClient) { }

  //findAll(): Observable<Cliente[]>{
   // return this.http.get<Cliente[]>(this.url);
    // }
  findAll(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.url).pipe(
        catchError(error => {
          if (error.status === 403) {
            console.warn('Acceso denegado: no tienes permisos para ver los clientes.');
            return of([]); 
          }
          throw error; 
        })
      );
    }

  findById(id: number): Observable<Cliente> {
  return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`Acceso denegado para obtener cliente con id ${id}`);
        return of(null as any);
      }
      return throwError(() => error);
    })
  );
}

create(cliente: Cliente): Observable<Cliente> {
  return this.http.post<Cliente>(this.url, cliente).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`Acceso denegado para crear cliente`);
        return of(null as any);
      }
      return throwError(() => error);
    })
  );
}

update(cliente: Cliente): Observable<Cliente> {
  return this.http.put<Cliente>(`${this.url}/${cliente.id_cliente}`, cliente).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`Acceso denegado para actualizar cliente`);
        return of(null as any);
      }
      return throwError(() => error);
    })
  );
}

remove(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`Acceso denegado para eliminar cliente con id ${id}`);
        return of(); // devuelve Observable<void>
      }
      return throwError(() => error);
    })
  );
}


}
