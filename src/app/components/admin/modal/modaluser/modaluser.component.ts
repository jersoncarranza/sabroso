import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{User} from '../../../../models/user';
import { Inject } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {ThemePalette} from '@angular/material/core';
import {AdminService} from '../../../../services/admin/admin.service';
import {MailService} from '../../../../services/mail/mail.service';
import * as alertify from 'alertifyjs';
import { GLOBAL}     from '../../../../services/global';
@Component({
  selector: 'app-modaluser',
  templateUrl: './modaluser.component.html',
  styleUrls: ['./modaluser.component.css'],
  providers:[AdminService, MailService]
})
export class ModaluserComponent implements OnInit {

    color: ThemePalette = 'accent';
    public checked = false;
    public status: string;

    public statusmsg:string;
    public message:string;

    public urlImage: string;
    @ViewChild('mensaje', { read: ElementRef }) InputMensaje:ElementRef;

    constructor(
        private _userAdminService   : AdminService,
        private _mailService : MailService,
        private dialogRef: MatDialogRef<ModaluserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User)
    {
        this.urlImage = GLOBAL.urlcloudinary;
    }


    ngOnInit(): void {


        if (this.data.estado == 1) {
            this.checked = true;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onChange(value: MatSlideToggleChange) {
        const { checked } = value;

         const id = this.data._id;

           this._userAdminService.updateEstadoUser(id, checked).subscribe(
            response =>{
                // if(!response.status){
                //     this.status = 'error'
                // }else{
                    // this.total = response.total;
                    // this.users = response.users;
                    // this.pages = response.pages;

                // }
            },
            error =>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        )

    }

    sendMail(){
        let mensaje =  this.InputMensaje.nativeElement.value;
        if (mensaje) {
            alertify.confirm('Enviar','¿Estas seguro de enviar?',
            ()=> {
                //console.log(''+ this.data.email);
                this.enviarMail(this.data.email, mensaje);
            },
            ()=> { alertify.error('Cancelar')}).set('labels',{ok:'ok', cancel:'cancelar'}) ;

        }else{
            alertify.warning('Esta vacío');

        }
    }

    public enviarMail(inputMail, inputText) {

        let title = "Activación de cuenta";
        let from  = " jersoncarranza2@gmail.com";
		this._mailService.envioGmail(from,inputMail,title,inputText).subscribe(
			response =>{
				this.statusmsg = response.status;
				this.mensajeMail(this.statusmsg)
			},error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.mensajeMail(errorMessage.error.status);
			}}
		);

	};

    mensajeMail(code){
		switch (code) {
            case 1: alertify.alert('Mail', 'Mail enviado correctamente');
            this.InputMensaje.nativeElement.value=''; break;
			case 2: alertify.alert('Error Mail', 'No se envio el correo'); break;
			default:  this.message='No hay respuesta del servidor';	break;
		}
	}



}
