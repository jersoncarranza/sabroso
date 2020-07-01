//Modulos
import{NgModule} from '@angular/core';
import{CommonModule} from '@angular/common';

import{MomentModule} from 'angular2-moment';
import { MaterialModule } from '../material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//rutas
import {MessagesRoutingModule} from './home-routing-module';
//Components
import {HomeComponent} from '../components/user/home/home.component';
import {ProfileModeloComponent} from '../components/user/profile-modelo/profile-modelo.component';
import {UserService} from '../services/user/user.service';
import {UserGuard} from '../services/guard/user.guard';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ModaluserComponent } from '../components/admin/modal/modaluser/modaluser.component';
import { ModalmodeloComponent } from '../components/admin/modalmodelo/modalmodelo/modalmodelo.component';
import {ModalInfoComponent} from '../components/user/modal-info/modal-info.component';



@NgModule({
    declarations:[
        HomeComponent,
        ProfileModeloComponent

    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MessagesRoutingModule,
        MomentModule,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    exports:[
        HomeComponent,//MainComponent,
        ProfileModeloComponent
    ],
    providers:[
         UserService,
         UserGuard
    ],
    entryComponents:[
        ModaluserComponent,
        ModalmodeloComponent,
        ModalInfoComponent
    ]
    //bootstrap: [AppComponent]
})

export class HomeModule { }
