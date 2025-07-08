import { Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { CreditoComponent } from './components/credito/credito.component';
import { CreditosFormComponent } from './components/credito-form/creditos-form.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
     
    {
        path:'',
        pathMatch:'full',
        redirectTo: '/clientes'
    },

    {
        path: 'clientes',
        component: ClienteComponent,
        canActivate: [authGuard]
        
    },
    {
        path: 'clientes/crear',
        component: ClienteFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'clientes/editar/:id',
        component: ClienteFormComponent,
        canActivate: [authGuard]

    },
    {
        path: 'usuarios',
        component: UsuarioComponent,
        canActivate: [authGuard]

    },
    {
        path: 'usuarios/crear',
        component: UsuarioFormComponent,
        canActivate: [authGuard]

    },
    {
        path: 'usuarios/editar/:id',
        component: UsuarioFormComponent,
        canActivate: [authGuard]

    },
    {
        path:   'creditos',
        component: CreditoComponent,
        canActivate: [authGuard]

    },
    {
        path: 'creditos/crear',
        component: CreditosFormComponent,
        canActivate: [authGuard]

    },
    {
        path: 'creditos/editar/:id',
        component: CreditosFormComponent,
        canActivate: [authGuard]

    },
    {
        path: 'actualizar',
        component: ActualizarComponent,
    },
    {
        path: 'login',
        component: AuthComponent,
    }

    
   
];



