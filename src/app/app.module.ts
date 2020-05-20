import { NgModule , LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders} from './app.routing';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MomentModule} from 'angular2-moment';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';



import { LoginComponent } from './components/user/login/login/login.component';
//import { HeaderComponent } from './components/user/header/header/header.component';
import  './services/calendar/moment.es';
//import { HomeComponent } from './components/user/home/home.component';

import {UserGuard} from './services/guard/user.guard';
import { RegistrarComponent } from './components/modelo/registrar/registrar/registrar.component';
import {HomeModule } from './home/home.module';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MainComponent } from './components/user/main/main/main.component';
import { MainHijoComponent } from './components/user/main-hijo/main-hijo/main-hijo.component';
@NgModule({
  declarations: [
    AppComponent,
     LoginComponent,
     RegistrarComponent,
     MainComponent,
     MainHijoComponent,
     //HeaderComponent,
    // HomeComponent,
  ],
  imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MomentModule,
        HomeModule,
        MatNativeDateModule,
        MatDatepickerModule
  ],

  providers: [

      appRoutingProviders,
      UserGuard,
      { provide: LOCALE_ID, useValue: 'es' },
      MatNativeDateModule,
      MatDatepickerModule,
     // { provide: MatDatepickerIntl, useClass: DatepickerEsp }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
