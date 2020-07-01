import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../services/admin/admin.service';
import{User} from '../../../../models/user';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ModaluserComponent } from '../../../../components/admin/modal/modaluser/modaluser.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers:[AdminService]
})
export class UsuarioComponent implements OnInit {
    formGroup: FormGroup;
    color: ThemePalette = 'accent';
    checked = true;
    disabled = false;
    enableUser = false;

    public page: number;
    public next_page: number;
    public prev_page: number;
    public prev_enable: Boolean;

    public status: string;
    public total: number;
    public pages: number;
    public users: User[];

    constructor(
        private _userAdminService   : AdminService,
        private _router             : Router,
        private _route              : ActivatedRoute,
        public dialog               : MatDialog
    ) {

    }

    ngOnInit(): void {
        this.actualPage();
        this.prev_enable = false;
    }

    getUsers(page){
        this._userAdminService.getUsers(page).subscribe(
            response =>{
                if(!response.users){
                    this.status = 'error'
                }else{
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                  //  this.pagination = this.pages.fill().map((x,i)=>i); // [0,1,2,3,4]
                    if(page > this.pages){
                        this._router.navigate(['/home/admin/usuarios', 1]);
                    }
                }
            },
            error =>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        )
    }

    actualPage(){
        this._route.params.subscribe(params =>{
            let page : number = +params['page'];
            this.page = page;
            if(!page || (page == undefined)){
                page= 1;
            }
            else{
                this.next_page = Number(page) + 1;
                this.prev_page = page - 1;

                if(this.prev_page <= 0){
                    this.prev_page=1;
                }
            }
            this.getUsers(page);
        })
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

    ConvertGenero(inSexo: Number){
        switch (inSexo) {
            case 0: return ('Mujer') ;   break;
            case 1: return ('Hombre') ;  break;
            default:  return ('X') ;  break;
        }
    }


    openDialog(user: User):void {
        const dialogRef =   this.dialog.open(ModaluserComponent, {
            width: '500px',
            data:user
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
           // this.animal = result;
          });

      }



}
