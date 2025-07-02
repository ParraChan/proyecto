import { Rol } from "./rol";

export class Usuario{
    id_usuario: number=0;
    nombre!: string;
    apellido_paterno!:string;
    apellido_materno!:string;
    fecha_nacimiento!: string;
    fecha_ingreso!: string;
    rol!: string ;//Rol;

}