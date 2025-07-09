import { Injectable } from '@angular/core';
import { Credito } from '../models/credito';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  private creditos : Credito[]=[];

  private url: string = 'http://localhost:8080/api/creditos' 


  constructor(private http: HttpClient) { }

  //findAll(): Observable<Credito[]>{
  //return this.http.get<Credito[]>(this.url);
  //}
  
  findAll(): Observable<Credito[]> {
    return this.http.get<Credito[]>(this.url).pipe(
      catchError(error => {
        if (error.status === 403) {
          console.warn('Acceso denegado: no tienes permisos para ver los creditos.');
          return of([]); 
        }
        throw error; 
      })
    );
  }


  findById(id: number): Observable<Credito> {
  return this.http.get<Credito>(`${this.url}/${id}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`Acceso denegado al crédito con ID ${id}`);
        return of(null as any);
      }
      throw error;
    })
  );
}

 create(credito: Credito): Observable<Credito> {
  return this.http.post<Credito>(this.url, credito).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn('No tienes permisos para crear créditos.');
        return of(null as any);
      }
      throw error;
    })
  );
}

  update(credito: Credito): Observable<Credito> {
  return this.http.put<Credito>(`${this.url}/${credito.id_credito}`, credito).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`No tienes permisos para actualizar el crédito con ID ${credito.id_credito}.`);
        return of(null as any);
      }
      throw error;
    })
  );
}

  remove(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`No tienes permisos para eliminar el crédito con ID ${id}.`);
        return of(undefined);
      }
      throw error;
    })
  );
}
 findByAsesorId(id: number): Observable<Credito[]> {
  return this.http.get<Credito[]>(`${this.url}/asesor/${id}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`No tienes permisos para consultar los créditos del asesor ${id}.`);
        return of([]);
      }
      throw error;
    })
  );
}

}
