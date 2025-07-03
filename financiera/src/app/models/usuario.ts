import { Rol } from "./rol";

export class Usuario{
    id_usuario: number=0;
    nombre!: string;
    apellido_paterno!:string;
    apellido_materno!:string;
    fecha_nacimiento!: Date;
    fecha_ingreso!: Date;
    puesto!: Rol;

}