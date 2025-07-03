import { Injectable } from '@angular/core';
import { Credito } from '../models/credito';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  private creditos : Credito[]=[];

  private url: string = 'http://localhost:8080/api/creditos' 


  constructor(private http: HttpClient) { }

  findAll(): Observable<Credito[]>{
    return this.http.get<Credito[]>(this.url);

  }

  findById(id: number): Observable<Credito>{
    return this.http.get<Credito>(`${this.url}/${id}`);

  }

  create(credito: Credito): Observable<Credito>{
    return this.http.post<Credito>(this.url,credito);
  }

  update(credito: Credito): Observable<Credito>{
    return this.http.put<Credito>(`${this.url}/${credito.id_credito}`,credito);
  }

  remove(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)

  }
}
