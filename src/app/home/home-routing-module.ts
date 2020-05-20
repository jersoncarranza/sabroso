import{NgModule} from '@angular/core';
import{ RouterModule, Routes} from '@angular/router';
//Components
import {HomeComponent} from '../components/user/home/home.component';
import {ProfileModeloComponent} from '../components/user/profile-modelo/profile-modelo.component';
import {MainComponent} from '../components/user/main/main/main.component';
import {UserGuard} from  '../services/guard/user.guard';


const userRoutes: Routes = [

       { path:'home',
        component: HomeComponent, canActivate:[UserGuard],//MainComponent,
        children:[

            {path: 'perfil-modelo',   component: ProfileModeloComponent},
            {path: 'principal',       redirectTo: 'principal/1', pathMatch: 'full' }, // redirect to `first-component`
            {path: 'principal/:page', component: MainComponent},



            ]
        }

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
