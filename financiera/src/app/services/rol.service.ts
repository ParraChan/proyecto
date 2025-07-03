import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = 'http://localhost:8080/api/roles' 


  constructor(private http: HttpClient) { }


  findAll(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.url);
    
  }

  findById(id: number): Observable<Rol>{
    return this.http.get<Rol>(`${this.url}/${id}`);

  }

}
