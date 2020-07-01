import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import{User} from '../../../../models/user';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {AdminService} from '../../../../services/admin/admin.service';
import {ThemePalette} from '@angular/material/core';
import { GLOBAL}     from '../../../../services/global';
@Component({
  selector: 'app-modalmodelo',
  templateUrl: './modalmodelo.component.html',
  styleUrls: ['./modalmodelo.component.css'],
  providers:[AdminService]
})
export class ModalmodeloComponent implements OnInit {

    color: ThemePalette = 'accent';
    public checked = false;
    public status: string;

    public statusmsg:string;
    public message:string;

    public urlImage: string;
    constructor(
        private _adminService: AdminService,
        @Inject(MAT_DIALOG_DATA) public data: User,
        private dialogRef: MatDialogRef<ModalmodeloComponent>
    ) {
        this.urlImage = GLOBAL.urlcloudinary;
    }


    ngOnInit(): void {
        if (this.data.estado == 1) {
            this.checked = true;
        }
    }

    onChange(value: MatSlideToggleChange) {
        const { checked } = value;

         const id = this.data._id;

           this._adminService.updateEstadoUser(id, checked).subscribe(
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

    onClose(): void {
        this.dialogRef.close();
    }


}
