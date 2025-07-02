import { Injectable } from '@angular/core';
import { Credito } from '../models/credito';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  private creditos : Credito[]=[
    {
        id_credito: 1,
        monto_credito: 10.000,
        fecha_entrega: '2025-07-01',
        numero_pagos: '10',
        frecuencia_pagos: 'semanal',
        estatus_pago: 'Pagado',
        cliente: 'Mari',
        usuario:'Karely'

    },
    {
        id_credito: 2,
        monto_credito: 10.000,
        fecha_entrega: '2025-07-01',
        numero_pagos: '10',
        frecuencia_pagos: 'semanal',
        estatus_pago: 'Pagado',
        cliente: 'Mari',
        usuario:'Karely'

    },
    {
        id_credito: 3,
        monto_credito: 10.000,
        fecha_entrega: '2025-07-01',
        numero_pagos: '10',
        frecuencia_pagos: 'semanal',
        estatus_pago: 'Pagado',
        cliente: 'Mari',
        usuario:'Karely'

    }
  ]

  constructor() { }
}
