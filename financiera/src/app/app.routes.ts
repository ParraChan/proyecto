import { Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { CreditoComponent } from './components/credito/credito.component';
import { CreditosFormComponent } from './components/credito-form/creditos-form.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { PageComponent } from './components/page/page.component';

export const routes: Routes = [
     
    {
        path:'',
        pathMatch:'full',
        redirectTo: '/page'
    },

    {
        path: 'clientes',
        component: ClienteComponent,
        
    },
    {
        path: 'clientes/crear',
        component: ClienteFormComponent,
    },
    {
        path: 'clientes/editar/:id',
        component: ClienteFormComponent,
    },
    {
        path: 'usuarios',
        component: UsuarioComponent,
    },
    {
        path: 'usuarios/crear',
        component: UsuarioFormComponent,
    },
    {
        path: 'usuarios/editar/:id',
        component: UsuarioFormComponent,
    },
    {
        path:   'creditos',
        component: CreditoComponent,
    },
    {
        path: 'creditos/crear',
        component: CreditosFormComponent,
    },
    {
        path: 'creditos/editar/:id',
        component: CreditosFormComponent,
    },
    {
        path: 'actualizar',
        component: ActualizarComponent,
    },
    {
        path: 'page',
        component: PageComponent,
    }

    
   
];



