import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/login';

  private _token!: string ;
  private _usuario:any={
    isAuth: false,
    usuario: undefined,
  }

  asesorLog: Usuario | null = null;


  constructor(private http: HttpClient) { }

  loginUsuario({nombreusuario,contrasena}: any): Observable<any>{
    return this.http.post<any>(this.url,{nombreusuario,contrasena});
  }

  set usuario(usuario: any){
    this._usuario= usuario;
    localStorage.setItem('login',JSON.stringify(usuario));

  }

  get usuario(){
    if(this._usuario.isAuth){
    return this._usuario;

    }else if(localStorage.getItem('login') != null){
      this._usuario = JSON.parse(localStorage.getItem('login')||'{}');
    return this._usuario;

    }

    return this._usuario;
  }

  set token(token: string){
    this._token= token;
    localStorage.setItem('token', token)
  }

  get token(){
    if(this._token != undefined){
      return this._token;
    } else if(localStorage.getItem('token')!= null){
      this._token = localStorage.getItem('token') || '';
      return this._token;
    }
    return this._token;
  }

  get rol(){
    return this._usuario.usuario?.rol || null;
  }

  getPayload(token: string){
    if(token!= null){
      return JSON.parse(atob(token.split(".")[1]))
    }
    return null;
  }

  authenticated(){
    return this.usuario.isAuth;
  }

  logout(){
    this._token='';
    this._usuario={
    isAuth: false,
    usuario: undefined,
  }
  localStorage.removeItem('login');
  localStorage.removeItem('token');
  }

  hasRole(role: string): boolean {
    return this.rol === role;
  }

  get idAsesor():number|null{
     return this.asesorLog?.idUsuario || null;
  }

  get asesor():string | null{
    const token = this.token;
    if(!token){
      return null 
    }try{
      const payload = this.getPayload(token);
      return payload?.sub || null;
    }catch(e){
      return null;

    }

  }


}
