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
import  './services/calendar/moment.es';

import {UserGuard} from './services/guard/user.guard';
import { RegistrarComponent } from './components/modelo/registrar/registrar/registrar.component';
import { HomeModule } from './home/home.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MainComponent } from './components/user/main/main/main.component';
import { MainHijoComponent } from './components/user/main-hijo/main-hijo/main-hijo.component';
import { MainadminComponent } from './components/admin/mainadmin/mainadmin.component';
import { UsuarioComponent } from './components/admin/usuario/usuario/usuario.component';
import { ModeloComponent } from './components/admin/modelo/modelo/modelo.component';
import { ModaluserComponent } from './components/admin/modal/modaluser/modaluser.component';
import { ModalmodeloComponent } from './components/admin/modalmodelo/modalmodelo/modalmodelo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalInfoComponent } from './components/user/modal-info/modal-info.component';
import { SearchPipe } from './pipes/search.pipe';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadComponent } from './components/test/upload/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
     LoginComponent,
     RegistrarComponent,
     MainComponent,
     MainHijoComponent,
     MainadminComponent,
     UsuarioComponent,
     ModeloComponent,
     ModaluserComponent,
     ModalmodeloComponent,
     NotFoundComponent,
     ModalInfoComponent,
     SearchPipe,
     UploadComponent,
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
        MatDatepickerModule,
        FileUploadModule
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
