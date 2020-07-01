import{NgModule} from '@angular/core';
import{ RouterModule, Routes} from '@angular/router';
//Components
import {HomeComponent} from '../components/user/home/home.component';
import {ProfileModeloComponent} from '../components/user/profile-modelo/profile-modelo.component';
import {MainComponent} from '../components/user/main/main/main.component';
import {UserGuard} from  '../services/guard/user.guard';
/*Admin*/
import{MainadminComponent} from '../components/admin/mainadmin/mainadmin.component';
import{UsuarioComponent} from '../components/admin/usuario/usuario/usuario.component';
import{ModeloComponent} from '../components/admin/modelo/modelo/modelo.component';

const userRoutes: Routes = [

       { path:'home',
        component: HomeComponent, canActivate:[UserGuard],//MainComponent,
        children:[

            {path: 'perfil-modelo',   component: ProfileModeloComponent},
            {path: 'principal',       redirectTo: 'principal/1', pathMatch: 'full' }, // redirect to `first-component`
            {path: 'principal/:page', component: MainComponent},

            {path: 'admin', component: MainadminComponent,  canActivate:[UserGuard]},
            {path: 'admin/usuarios', redirectTo:'admin/usuarios/1', pathMatch:'full', canActivate:[UserGuard]},
            {path: 'admin/usuarios/:page', component: UsuarioComponent, canActivate:[UserGuard]},

            {path: 'admin/modelos', redirectTo:'admin/modelos/1',pathMatch:'full',canActivate:[UserGuard]},
            {path: 'admin/modelos/:page', component: ModeloComponent, canActivate:[UserGuard]},

            ]
        },

        // {path: 'admin', component: MainadminComponent,  canActivate:[UserGuard]},
        // {path: 'admin/usuarios', component: UsuarioComponent, canActivate:[UserGuard]},
        // {path: 'admin/modelos', component: ModeloComponent, canActivate:[UserGuard]},


       /*
        { path:'home', component: HomeComponent  },
        {path:'perfil-modelo', component: ProfileModeloComponent}
        */
];
@NgModule({
    imports:[
        RouterModule.forChild(userRoutes),

    ],
    exports:[
        RouterModule
    ]
})
export class MessagesRoutingModule{ }
