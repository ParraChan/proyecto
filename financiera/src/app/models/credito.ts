import { Cliente } from "./cliente";
import { Usuario } from "./usuario";

export class Credito{
    id_credito :number=0;
    monto_credito!: number;
    fecha_entrega!: string;
    numero_pagos!: '10' | '12' | '16' | '24';
    frecuencia_pagos!: 'semanal' | 'quincenal' | 'mensual';
    estatus_pago!: 'Pagado' | 'Pendiente';
    cliente!: string; //Cliente;
    usuario!: string; //Usuario;
}