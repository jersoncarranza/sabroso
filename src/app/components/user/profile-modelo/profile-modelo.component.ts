import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {UserModeloService} from '../../../services/user-modelo/user-modelo.service';
import{ User} from '../../../models/user';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Country}    from './country';
import { City   }    from './city';
import { GeoService} from  '../../../services/geo/geo.service';
import { UploadService} from '../../../services/upload/upload.service';
import { GLOBAL}     from '../../../services/global';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-profile-modelo',
  templateUrl: './profile-modelo.component.html',
  styleUrls: ['./profile-modelo.component.css'],
  providers: [UserModeloService,GeoService,UploadService ]
})
export class ProfileModeloComponent  implements OnInit {

    /***Red social**/
    @ViewChild('redsocial', {static: false}) InputRedSocial: ElementRef;
    @ViewChild('whatsapp', {static: false})  InputWhatsapp: ElementRef;
    @ViewChild('imageprofile', {static: false}) DivImageProfile: ElementRef;
    public identity;
    public token;

    public user: User;
    public userEdit: User;
    public country: Country[];
    public city   : City[];
    //public tiles: Tile[];
    public  Form: FormGroup;

    public urlImage: string;
    /***File***/
    fileData    : File = null;
    previewUrl  : any = null;
    fileUploadProgress  : string = null;
    uploadedFilePath    : string = null;
    public urlFile      : string;

    constructor(
        private _userServiceModelo: UserModeloService,
        private _userService    :   UserService,
        private _geoService     :   GeoService,
        private _snackBar       :   MatSnackBar,
        private _uploadService  :   UploadService
    ) {
        this.token      = this._userService.getToken();
        this.user       = this._userService.getIdendity();
        this.identity   = this.user;

        this.Form = new FormGroup({
            nombre_form:         new FormControl(),
            descripcion_form:    new FormControl(),
        });
        this.userEdit = new User("","","","","","","","","","",1,true, -1,8,-1,-1,0,0,"","","","","","","","","","");
        this.urlFile = GLOBAL.url;
        this.urlImage = GLOBAL.urlcloudinary;

     }

    ngOnInit() {
        this.cargarDatosUsuario();
       // this.loadPais();
    }

    private cargarDatosUsuario = (): void=> {
        let userid = this.user._id;
        this._userServiceModelo.getUserModelo(userid).subscribe(
                (response:any) =>{

                if(!response.user){
                    console.log('no hay datos');
                }else{
                  //  console.log('no hay datos');

                    //console.log(response);
                    this.user = response.user;
                    console.log('ok: '+this.user);
                   this.Form.controls['nombre_form'].setValue(this.user.nombres);
                   this.Form.controls['descripcion_form'].setValue(this.user.descripcion);
                }

            }
        )

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


    onDatosUsuario(){
        if(this.Form.value.nombre_form != '' && this.Form.value.descripcion_form != '' ){
            this.userEdit._id           = this.user._id;
            this.userEdit.nombres       = this.Form.value.nombre_form.trim();
            this.userEdit.descripcion   = this.Form.value.descripcion_form.trim();
            this._userServiceModelo.EditUserModelo(this.userEdit).subscribe(
                (response:any) =>{
                    if (response.status == 1) {
                        this._snackBar.open('Corectamente Modificado', 'Ok',{ duration: 1000});



                    }else{
                        this._snackBar.open('Intentalo de nuevo', 'Error',{ duration: 1500});
                    }
                }
            )

        }else{

        }
        this.cambiarFoto();

    }

    cambiarFoto(){
        console.log('comprovando');
        if(this.filesToUpload){

            this._uploadService.makeFileRequestModeloRegister(
                this.urlFile + 'user/upload-user-cloudinary/'+ this.user._id,
                [],
                this.filesToUpload,
                'image')
            .then((result:any)=>{
                this.user.image = result.user.image;
                this.filesToUpload = null;
                console.log('listo');

            });
        }

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
           this.DivImageProfile.nativeElement.style.display  = 'none';
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

       /***Red Social ***/

       onRedSocial(){
        let red = this.InputRedSocial.nativeElement.value;
        let tipo = 1;
        this.metodoEditRedSocial(red,tipo);
       }

       onWhatsapp(){
        let red = this.InputWhatsapp.nativeElement.value;
        let tipo = 2;
        this.metodoEditRedSocial(red,tipo);

       }

       metodoEditRedSocial(red: String , tipo: Number){
        this._userServiceModelo.EditRedSocial(red, tipo).subscribe(
            (response:any) =>{
                if (response.status == 1) {
                    this._snackBar.open('Corectamente Modificado', 'Ok',{ duration: 1000});
                }else{
                    this._snackBar.open('Intentalo de nuevo', 'Error',{ duration: 1500});
                }
            }
        )
       }

       numberOnly(event): boolean {
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        }


}
