import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = 'http://localhost:8080/api/roles' 


  constructor(private http: HttpClient) { }


findAll(): Observable<Rol[]> {
  return this.http.get<Rol[]>(this.url).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn('Acceso denegado: no tienes permisos para ver los roles.');
        return of([]); // Devuelve un arreglo vacío en caso de error 403
      }
      throw error;
    })
  );
}

findById(id: number): Observable<Rol> {
  return this.http.get<Rol>(`${this.url}/${id}`).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.warn(`Acceso denegado al rol con ID ${id}.`);
        return of(null as any); // Devuelve null en caso de error 403
      }
      throw error;
    })
  );
}

}
