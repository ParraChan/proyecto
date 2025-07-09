import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { Router, RouterOutlet } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Credito } from '../models/credito';
import { CreditoService } from '../services/credito.service';
import { RolService } from '../services/rol.service';
import { Rol } from '../models/rol';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'financiera-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: 'financiera-app.component.html'
})
export class FinancieraAppComponent implements OnInit {

  clientes: Cliente[] = [];

  usuarios: Usuario[] = [];

  creditos: Credito[] = [];

  roles: Rol[] = [];

  constructor(private service: ClienteService,
    private serviceU: UsuarioService,
    private serviceC: CreditoService,
    private serviceR: RolService,
    private sharingData: SharingDataService,
    private router: Router,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(clientes => this.clientes = clientes);
    this.serviceU.findAll().subscribe(usuarios => {
      this.serviceU.findAll().subscribe(usuarios => this.usuarios = usuarios);

      this.usuarios = usuarios
    });
    this.serviceC.findAll().subscribe(creditos => this.creditos = creditos);
    this.serviceR.findAll().subscribe(roles => {
      this.roles = roles
      //console.log('Roles cargados ',this.roles)
    })

    this.addClient();
    this.removeClient();
    this.findClientById();

    this.addUser();
    this.removeUser();
    this.findUserById();
    this.handlerLogin();

    this.addCredit();
    this.removeCredit();
    this.findCreditById();

    this.findRolById();
  }

  handlerLogin() {
    this.sharingData.HandlerLoginEventEmitter.subscribe(({ nombreusuario, contrasena }) => {
      console.log(nombreusuario + ' ' + contrasena);

      this.authService.loginUsuario({ nombreusuario, contrasena }).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          const payload = this.authService.getPayload(token);

          //AQUI SE PARSEA LOS ROLESSSSSSS

          const rolSinLimpiar = payload.authorities;
        //  console.log('ROL SUCIO ',rolSinLimpiar);

          const rolLimpiado = rolSinLimpiar.replace(/\\/g, '');
         // console.log('ROL LIMPIO PERO SIN FORMATO',rolLimpiado);

          const authorities = JSON.parse(rolLimpiado);
         // console.log( 'Yeison kkkkk: ',authorities);

          const rol = authorities.length > 0 ? authorities[0].authority : null;
        //  console.log('ROL :D :', rol);


          const usuario = {
            nombreusuario: payload.sub,
            rol: rol
          }

          const login = {
            usuario,
            isAuth: true,

          }
          console.log(payload);
          this.authService.token = token;
          this.authService.usuario = login;
          
          
          if(this.authService.rol==='ROLE_ASESOR'){
            this.router.navigate(['/creditos']);
          }else{
          this.router.navigate(['/clientes']);

          }

        },
        error: error => {
          if (error.status == 401) {
            Swal.fire('Error en el login', error.error.message, 'error');
          } else {
            throw error;
          }

        }
      })
    })
  }

  findRolById() {
    this.sharingData.findRolByIdEventEmitter.subscribe(id => {
      const rol = this.roles.find(rol => rol.nombre_rol == id);

      this.sharingData.selectRolEventEmitter.emit(rol);
    })
  }

  findClientById() {
    this.sharingData.findClientByIdEventEmitter.subscribe(id => {
      const cliente = this.clientes.find(cliente => cliente.id_cliente == id);

      this.sharingData.selectClientEventEmitter.emit(cliente);
    })

  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      const usuario = this.usuarios.find(usuario => usuario.idUsuario == id)

      this.sharingData.selectUserEventEmitter.emit(usuario);
    })

  }

  findCreditById() {
    this.sharingData.findCreditByIdEventEmitter.subscribe(id => {
      const credito = this.creditos.find(credito => credito.id_credito == id)
      this.sharingData.selectCreditEventEmitter.emit(credito);
    })

  }


  addClient() {
    this.sharingData.newClientEventEmitter.subscribe(cliente => {
      if (cliente.id_cliente > 0) {
        this.service.update(cliente).subscribe({
          next: (clienteUpdated) => {
            this.clientes = this.clientes.map(c => (c.id_cliente == clienteUpdated.id_cliente) ? { ...clienteUpdated } : c)
            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/clientes']);
            })
          },
          error: (err) => {

            console.log(err.error);
            this.sharingData.errorsClientFormEventEmitter.emit(err.error);

          }
        }
        );



      } else {
        this.service.create(cliente).subscribe({
          next: (clienteNew) => {

            this.clientes = [... this.clientes, { ...clienteNew }]
            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/clientes']);
            })


          },
          error: (err) => {
            console.log(err.error);
            this.sharingData.errorsClientFormEventEmitter.emit(err.error);


          }
        }
        )//subscribe

      }




    }
    )

  }

  removeClient(): void {
    this.sharingData.idClientEventEmitter.subscribe(id => {


      Swal.fire({
        title: "Estas seguro?",
        text: "no hay marcha atras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borralo"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.remove(id).subscribe(() => {
            this.clientes = this.clientes.filter(cliente => cliente.id_cliente != id)
            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/clientes']);
            });

          })

          Swal.fire({
            title: "Eliminado",
            text: "El cliente se ha eliminado correctamente",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff", backdrop: `
                            rgba(0,0,123,0.4)
                            url("assets/img/SadNyan.webp")
                            left top
                            no-repeat
                          `
          });
        }
      });

    })


  }



  addUser() {

    this.sharingData.newUserEventEmitter.subscribe(usuario => {
      if (usuario.idUsuario > 0) {
        this.serviceU.update(usuario).subscribe({
          next: (usuarioUpdated) => {
            this.usuarios = this.usuarios.map(u => (u.idUsuario == usuarioUpdated.idUsuario ? { ...usuarioUpdated } : u))
            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/usuarios']);
            })
            Swal.fire({
              title: "Usuario actualizado",
              text: "El usuario se ha actualizado correctamente",
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "#fff", backdrop: `
                           rgba(0,0,123,0.4)
                           url("assets/img/cat.gif")
                           left top
                           no-repeat
                         `
            });
          },
          error: (err) => {
            console.log(err.error);
            this.sharingData.errorsUserFormEventEmitter.emit(err.error);

          }
        }
        )
      } else {
        this.serviceU.create(usuario).subscribe({
          next: (userNew) => {
            this.usuarios = [... this.usuarios, { ...userNew }]
            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/usuarios']);
            })
            Swal.fire({
              title: "Usuario creado",
              text: "El usuario se ha creado correctamente",
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "#fff", backdrop: `
                           rgba(0,0,123,0.4)
                           url("assets/img/cat.gif")
                           left top
                           no-repeat
                         `
            });
          },
          error: (err) => {
            console.log(err.error);
            this.sharingData.errorsUserFormEventEmitter.emit(err.error);

          }
        }
        )


      }
    });

  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log(id);
          this.serviceU.remove(id).subscribe(() => {
            this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario != id)
            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/usuarios']);
            })

          })

          Swal.fire({
            title: "Eliminado",
            text: "El usuario se ha eliminado correctamente",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff", backdrop: `
                            rgba(0,0,123,0.4)
                            url("assets/img/SadNyan.webp")
                            left top
                            no-repeat
                          `
          });
        }
      });

    })
  }



  addCredit() {
    this.sharingData.newCreditEventEmitter.subscribe(credito => {
      if (credito.id_credito > 0) {
        this.serviceC.update(credito).subscribe({
          next: (creditoUpdated) => {
            //  console.log(this.creditos)
            this.creditos = this.creditos.map(cr => (cr.id_credito == creditoUpdated.id_credito) ? { ...creditoUpdated } : cr)

            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/creditos']);
            })


          },
          error: (err) => {
            console.log(err.error);
            this.sharingData.errorsCreditFormEventEmitter.emit(err.error);

          }
        }

        );
        Swal.fire({
          title: "Credito actualizado",
          text: "El credito se ha actualizado correctamente",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff", backdrop: `
                           rgba(0,0,123,0.4)
                           url("assets/img/cat.gif")
                           left top
                           no-repeat
                         `
        });

      } else {
        this.serviceC.create(credito).subscribe({
          next: (creditoNew) => {
            this.creditos = [... this.creditos, { ...creditoNew }]

            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/creditos']);
            })

            Swal.fire({
              title: "Credito actualizado",
              text: "El credito se ha actualizado correctamente",
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "#fff", backdrop: `
                           rgba(0,0,123,0.4)
                           url("assets/img/cat.gif")
                           left top
                           no-repeat
                         `
            });

          },
          error: (err) => {
            console.log(err.error);
            this.sharingData.errorsCreditFormEventEmitter.emit(err.error);

          }
        }
        )//subscrine


      }


    })
  }

  removeCredit() {
    this.sharingData.idCreditEventEmitter.subscribe(id => {

      Swal.fire({
        title: "Estas seguro?",
        text: "no hay marcha atras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borralo"
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceC.remove(id).subscribe(() => {
            this.creditos = this.creditos.filter(credito => credito.id_credito != id)
            this.router.navigate(['/actualizar'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/creditos']);
            })
          })

          Swal.fire({
            title: "Eliminado",
            text: "El credito se ha eliminado correctamente",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff", backdrop: `
                            rgba(0,0,123,0.4)
                            url("assets/img/SadNyan.webp")
                            left top
                            no-repeat
                          `
          });
        }
      });

    })
  }





}
