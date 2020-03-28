import{NgModule} from '@angular/core';
import{ RouterModule, Routes} from '@angular/router';
//Components
import {HomeComponent} from '../components/user/home/home.component';
import {ProfileModeloComponent} from '../components/user/profile-modelo/profile-modelo.component';
import {UserGuard} from  '../services/guard/user.guard';

const userRoutes: Routes = [
        
       { path:'home',
        component: HomeComponent, //MainComponent,
        children:[
            {path:'*', redirectTo: 'perfil-modelo', pathMatch:'full'},
            {path:'perfil-modelo', component: ProfileModeloComponent}
        ]
        }

       /*
        { path:'home', component: HomeComponent  },
        {path:'perfil-modelo', component: ProfileModeloComponent}
        */
];
@NgModule({
    imports:[
        RouterModule.forChild(userRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class MessagesRoutingModule{ }
