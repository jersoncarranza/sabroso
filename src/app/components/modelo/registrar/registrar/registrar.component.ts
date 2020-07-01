import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { User} from '../../../../models/user';
import { Country} from '../../../../models/country';
import { City} from '../../../../models/City';
import * as moment from 'moment';
import '../../../../services/calendar/moment.es';
import * as alertify from 'alertifyjs';
import {UserService} from  '../../../../services/user/user.service';
import {GeoService} from  '../../../../services/geo/geo.service';
import{Router} from '@angular/router';
import {UploadService} from '../../../../services/upload/upload.service';
import{GLOBAL} from '../../../../services/global';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  providers:[UserService, GeoService, UploadService]
})
export class RegistrarComponent implements OnInit {
    @ViewChild('card', {static: false}) DivCard: ElementRef;
    fechaActual = new Date();
    aio = this.fechaActual.getFullYear();
    mes = this.fechaActual.getMonth();
    day = this.fechaActual.getDay();
    fecha1 = new Date( this.aio+'/'+this.mes+'/'+this.day);
    fecha2 = new Date();
    minDate = new Date(1950, 0, 1);
    maxDate = new Date(this.aio-18,  this.mes ,this.day);
    public hide = true;

    public  Form: FormGroup;
    public  userRegisterModelo: User;
    public country: Country[];
    public city: City[];

    public status: number;
    public message: string;
    public selectCountry : Country[] = [];

    public user: User;
    public loading: boolean;
    /***File***/

    fileData: File = null;
    previewUrl:any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    public urlFile: string;
    /***Token**/
    public    /** **/
    constructor(
        private _userService: UserService,
        private _geoService: GeoService,
        private _router: Router,
        private _uploadService: UploadService,
    ) {

        this.Form = new FormGroup({
            email:      new FormControl('', [Validators.required, Validators.email]),
            nombre:     new FormControl(),
            contrasena: new FormControl(),
            calendar:   new FormControl(),
            sexo:       new FormControl(),
            country:    new FormControl(),
            city:       new FormControl()
        });
        this.userRegisterModelo = new User("","","","","","","","","","",1,true, -1,8,-1,-1,0,0,"","","","","","","","","","");
        moment.locale('es');
        this.urlFile = GLOBAL.url;
        this.loading = false;

    }
      //Registrar
      email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
        return this.email.hasError('required') ? 'Ingrese mail' : this.email.hasError('email') ? 'Mail incorrecto' :'';
    }


    ngOnInit() {
        this.loadPais();
    }

    DatosUsuario(){
        if(this.filesToUpload &&
            this.Form.value.nombre      != ''   &&
			this.Form.value.email	   != ''   &&
            this.Form.value.contrasena != ''   &&
            this.Form.value.calendar   != null   &&
            this.Form.value.country    != null &&
            this.Form.value.city       != null &&
            (this.Form.value.sexo   == 1 ||  this.Form.value.sexo   == 0)){

            this.userRegisterModelo.nombres   =  this.Form.value.nombre.trim();
			this.userRegisterModelo.email     =  this.Form.value.email.trim();
            this.userRegisterModelo.password  =  this.Form.value.contrasena.trim();
            this.userRegisterModelo.fechaNacimiento =  this.Form.value.calendar;
            this.userRegisterModelo.sexo    = this.Form.value.sexo;
            this.userRegisterModelo.tipo    = 8; // 7 Cliente , 8 modelo
            this.userRegisterModelo.country = this.Form.value.country;
            this.userRegisterModelo.city    = this.Form.value.city;
            this.loading = true;

    
            this.DivCard.nativeElement.style.display  = 'none',

      		this._userService.registerModelo(this.userRegisterModelo).subscribe(
		   	response => {
                this.status =response.status;

                    if (this.status==1) {
                        this.message = 'Listo';
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('identity', JSON.stringify( response.user));
                        this.user = response.user;

                        if(this.filesToUpload && this.filesToUpload.length){
                            //Subida de imagen de usuario
                            this._uploadService.makeFileRequestModeloRegister(this.urlFile + 'user/upload-model-dni/'+ this.user._id, [], this.filesToUpload, 'image')
                            .then((result:any)=>{
                                this.user.image = result.user.image;
                                localStorage.setItem('identity', JSON.stringify(this.user));
                                this._router.navigate(['/home/perfil-modelo']);

                            });
                        }
                        this.loading = false;
                    }
                    this.mensajeEstado(this.status);
                    this.loading = false;
                    this.DivCard.nativeElement.style.display  = 'block';
		 		}
             );

		}else{
			alertify.alert('Complete', 'Ingrese todos los datos');
		}
    }

    /** **/

    mensajeEstado(code:Number){
		switch (code) {
			case 0: alertify.alert('Error', 'Error intentalo mas tarde');break;
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


    //Cargar pais provincias
    loadPais(){
        this._geoService.getCountries().subscribe(
            response =>{
                this.country =  response.countryList;
            }
        )
    }

    loadProvincia(idCountry:String){
        this._geoService.getCities(idCountry).subscribe(
            response =>{
                this.city =  response.citiesList;
            }
        )
    }
    onChange(event) {
        this.loadProvincia(event.source.value);
    }
    //******Archivos - Files*****/

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
    }

    preview() {
        // Show preview
        var  mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }

        var reader = new FileReader();

        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
          this.previewUrl = reader.result;
        }
    }


}
