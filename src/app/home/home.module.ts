//Modulos
import{NgModule} from '@angular/core';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import{MomentModule} from 'angular2-moment';
//rutas
import {MessagesRoutingModule} from './home-routing-module';
//Components
import {HomeComponent} from '../components/user/home/home.component';
import {ProfileModeloComponent} from '../components/user/profile-modelo/profile-modelo.component';
import {UserService} from '../services/user/user.service';
import {UserGuard} from '../services/guard/user.guard';

@NgModule({
    declarations:[
        HomeComponent,//MainComponent,
        ProfileModeloComponent

    ],
    imports:[
        CommonModule,
        FormsModule,
        MessagesRoutingModule,
        MomentModule
    ],
    exports:[
        HomeComponent,//MainComponent,
        ProfileModeloComponent

    ],
    providers:[
         UserService,
         UserGuard
    ],

    //bootstrap: [AppComponent]
})

export class HomeModule { }
