import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios : Usuario[] = [
    {
      id_usuario: 1,
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Garcia',
      fecha_nacimiento: '1997-01-26',
      fecha_ingreso: '2025-01-17',
      rol:'nose'

    },
     {
      id_usuario: 2,
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Garcia',
      fecha_nacimiento: '1997-01-26',
      fecha_ingreso: '2025-01-17',
      rol:'nose'

    },
     {
      id_usuario: 3,
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Garcia',
      fecha_nacimiento: '1997-01-26',
      fecha_ingreso: '2025-01-17',
      rol:'nose'

    },
  ]

  constructor() { }

    findAll(): Observable<Usuario[]>{
        return of(this.usuarios);
   }
}
