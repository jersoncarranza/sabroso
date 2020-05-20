import{ Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {LoginComponent} from './components/user/login/login/login.component'
import { RegistrarComponent } from './components/modelo/registrar/registrar/registrar.component';

//import{HomeComponent} from './components/user/home/home.component';
import {UserGuard} from './services/guard/user.guard';
//import { ProfileModeloComponent } from './components/user/profile-modelo/profile-modelo.component';
//import { AppComponent } from './app.component';

const appRoutes: Routes = [
    {path:'login', component: LoginComponent },
    {path:'registrar-modelo', component: RegistrarComponent }

   // {path:'home',  component: HomeComponent , canActivate:[UserGuard]},
   /// {path:'',      component: HomeComponent , canActivate:[UserGuard]},

    //{path:'perfil-modelo', component: ProfileModeloComponent}



];
    export const appRoutingProviders: any[] = [];
    export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);

