import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { User} from '../../../../models/user';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from  '../../../../services/user/user.service';
import * as alertify from 'alertifyjs';
import {MustMatch} from '../../../../services/validator/validator.service';
import * as moment from 'moment';
import '../../../../services/calendar/moment.es';
;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
    fechaActual = new Date();
    aio = this.fechaActual.getFullYear();
    mes = this.fechaActual.getMonth();
    day = this.fechaActual.getDay();
    fecha1 = new Date( this.aio+'/'+this.mes+'/'+this.day);
    fecha2 = new Date();
    minDate = new Date(1950, 0, 1);
    maxDate = new Date(this.aio-18,  this.mes ,this.day+2);

    public token: string;
    public identity: string;

    Form: FormGroup;
    FormLogin: FormGroup;
    tipo: Number;
    public user: User;
    userRegister: User;
    public hide = true;
    public status: number;
    public message: string;

    //barra

    constructor(
        private formBuilder: FormBuilder,
        private formBuilderLogin: FormBuilder,
        private _userService: UserService,
        private _router: Router,
    ) {
        this.Form = new FormGroup({
            email:  new FormControl('', [Validators.required, Validators.email]),
            nombre: new FormControl(),
            contrasena: new FormControl(),
            calendar: new FormControl(),
            sexo: new FormControl(),


        });

        this.FormLogin = new FormGroup({
            emailLogin:  new FormControl('', [Validators.required]),
            claveLogin:  new FormControl(),

        });

        this.user = new User("","","","","","","","","","",1,true, -1,7,-1,-1,0,0,"","","","","","");
        moment.locale('es');

    }

    //Registrar
    email = new FormControl('', [Validators.required, Validators.email]);
    //Login
    emailLogin = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
        return this.email.hasError('required') ? 'Ingrese mail' :
            this.email.hasError('email') ? 'Mail incorrecto' :
                '';
      }

      getErrorMessageLogin() {
        return this.email.hasError('required') ? 'Ingrese mail' :
            this.email.hasError('email') ? 'Mail incorrecto' :
                '';
      }

    validate() {
		this.Form = this.formBuilder.group({

            nombre:     ['', Validators.required],
            email:      ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required, Validators.minLength(6)]],
			calendar:   ['', Validators.required],
			sexo:       ['',Validators.required],
            // validator: MustMatch('password', 'confirmPassword')
        });
      }



    ngOnInit() {
       var identity = this._userService.getIdendity();
       if (identity != null) {
        this._router.navigate(['/home']);
       }
    }



    Registrar(){
        if(this.Form.value.nombre      != ''   &&
			this.Form.value.email	   != ''   &&
            this.Form.value.contrasena != ''   &&
            this.Form.value.calendar   != null   &&
            this.Form.value.sexo   == 1 ||  this.Form.value.sexo   == 0){

            this.user.nombres   =  this.Form.value.nombre.trim();
			this.user.email     =  this.Form.value.email.trim();
            this.user.password  =  this.Form.value.contrasena.trim();
            this.user.fechaNacimiento =  this.Form.value.calendar;
            this.user.sexo     = this.Form.value.sexo;

			this._userService.register(this.user).subscribe(
		   	response => {
                this.status =response.status;

                    if (this.status==1) {
                        this.message = 'Error en el servidor #2';
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('identity', JSON.stringify( response.user));
                    }
                    this.mensajeEstado(this.status);

		 		}
		 	);
		}else{
			alertify.alert('Complete', 'Ingrese todos los datos');
		}
    }

    Login(){

        if( this.FormLogin.value.emailLogin  != ''   &&
			this.FormLogin.value.claveLogin != ''   ){

            this.user.email        =  this.FormLogin.value.emailLogin.trim();
			this.user.password     =  this.FormLogin.value.claveLogin.trim();

			this._userService.login(this.user).subscribe(
		   	response => {
                this.status =response.status;
                    if (this.status==1) {
                        this.message = 'Error en el servidor #1';
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('identity', JSON.stringify( response.user));
                    }
                    this.mensajeEstadoLogin(this.status);
		 		}
		 	);
		}else{
			alertify.alert('Complete', 'Ingrese todos los datos');
		}

    }

    mensajeEstado(code:Number){
		switch (code) {
			case 0:
                alertify.alert('Error', 'Error intentalo mas tarde');
            break;
			case 1:
                this._router.navigate(['/home']);
                alertify.success('Correcto', 'Registro correctamente'); break;
            case 2: alertify.alert('Advertencia', 'La clave esta mal'); break;//login

            case 4: alertify.alert('Error', 'No se ha podido actualizar el estado del pago'); break;

			case 7: alertify.alert('Advertencia', 'No se que hacer'); break;
			case 8: alertify.alert('Advertencia', 'Este correo no existe'); break;//login
			case 9: alertify.alert('Error', 'Este correo ya esta registrado'); break;

            default: alertify.alert('Error', 'No hay respuesta del servidor');  this.message='No hay respuesta del servidor';	break;
		}
    }



    mensajeEstadoLogin(code:Number){
		switch (code) {
			case 0:   alertify.alert('Error', 'Error intentalo mas tarde');     break;//login
			case 1:     this._router.navigate(['/home']);         break;
            case 2: alertify.alert('Advertencia', 'La clave esta mal'); break;//login
            case 3: alertify.alert('Advertencia', 'El usuario esta desactivado'); break;//login


            case 4: alertify.alert('Error', 'No se ha podido actualizar el estado del pago'); break;

			case 7: alertify.alert('Advertencia', 'No se que hacer'); break;
			case 8: alertify.alert('Advertencia', 'Este correo no existe'); break;//login
			case 9: alertify.alert('Error', 'Este correo ya esta registrado'); break;

            default: alertify.alert('Error', 'No hay respuesta del servidor');  this.message='No hay respuesta del servidor';	break;
		}
    }



}
