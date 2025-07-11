import { Component, OnInit } from '@angular/core';
import { Credito } from '../../models/credito';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router, RouterModule } from '@angular/router';
import { CreditoService } from '../../services/credito.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'credito',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './credito.component.html'
})
export class CreditoComponent implements OnInit {
  creditos: Credito[] = [];

  cliente: Cliente[]=[];

  creditosFiltrados: Credito[] = [];

  filtroCredito: string = '';
  title: string = 'Listado de Créditos';

  constructor(
    private sharingData: SharingDataService,
    private router: Router,
    private service: CreditoService,
    private serviceU: UsuarioService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.authenticated()) {
      return;
    }

    if (this.authService.rol === 'ROLE_ASESOR') {
      const asesor = this.authService.asesor;
      if (asesor) {
        this.serviceU.findByUsername(asesor).pipe(take(1)).subscribe(usuario => {
          const idAsesor = usuario.idUsuario;
          this.service.findByAsesorId(idAsesor).pipe(take(1)).subscribe(creditos => {
            this.creditos = creditos;
            this.actualizarFiltroCreditos();
          });
        });
      }
    } else {
      this.service.findAll().pipe(take(1)).subscribe(creditos => {
        this.creditos = creditos;
        this.actualizarFiltroCreditos();
      });
    }
  }

  actualizarFiltroCreditos(): void {
  const filtro = this.filtroCredito.toLowerCase().trim();

  this.creditosFiltrados = this.creditos.filter(credito => {
    const campos = [
      credito.id_credito,
      credito.monto_credito,
      credito.fecha_entrega,
      credito.numero_pagos,
      credito.frecuencia_pagos,
      credito.estatus_pago,
      credito.cliente?.nombre,
      credito.cliente?.apellido_paterno,
      credito.cliente?.apellido_materno,
      credito.usuario?.nombre,
      credito.usuario?.apellido_paterno,
      credito.usuario?.apellido_materno
    ];

    return campos.some(campo =>
      campo?.toString().toLowerCase().includes(filtro)
    );
  });
}


  onRemoveCredit(id: number): void {
    this.sharingData.idCreditEventEmitter.emit(id);
  }

  onSelectedCredit(credito: Credito): void {
    this.router.navigate(['/creditos/editar', credito.id_credito]);
  }
}
