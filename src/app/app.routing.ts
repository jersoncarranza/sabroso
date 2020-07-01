import{ Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {LoginComponent} from './components/user/login/login/login.component'
import { RegistrarComponent } from './components/modelo/registrar/registrar/registrar.component';

//import{HomeComponent} from './components/user/home/home.component';
import {UserGuard} from './services/guard/user.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { UploadComponent } from './components/test/upload/upload/upload.component';
//import { ProfileModeloComponent } from './components/user/profile-modelo/profile-modelo.component';
//import { AppComponent } from './app.component';

const appRoutes: Routes = [
   // {path:'', component: LoginComponent },
   {path:'test', component: UploadComponent },

    {path:'',  component: LoginComponent  },
    {path:'login', component: LoginComponent },
    {path:'registrar-modelo', component: RegistrarComponent },
    {path:'404', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent}
   // {path:'home',  component: HomeComponent , canActivate:[UserGuard]},
   /// {path:'',      component: HomeComponent , canActivate:[UserGuard]},

    //{path:'perfil-modelo', component: ProfileModeloComponent}



];
    export const appRoutingProviders: any[] = [];
    export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);

