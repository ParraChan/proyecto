import { Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo: '/'
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
    }
];



