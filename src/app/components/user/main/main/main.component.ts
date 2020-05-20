import { Component, OnInit,  ViewChild, ElementRef, Input, Directive, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import {UserService} from '../../../../services/user/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import{User} from '../../../../models/user';
import{GLOBAL} from '../../../../services/global';



@Directive({selector: 'pane-card'})
    export class Pane {
        selector:['id-card']
    }

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[UserService]
})
export class MainComponent implements  OnInit {

  //  @ViewChildren("i") idarticle: QueryList<any>;

    @ViewChild('i', { read: ElementRef }) idarticle:ElementRef;
    @Input() MaterialCardRef: ElementRef;
    @Input() IconRef: ElementRef;

    @ViewChild('materialcard', { read: ElementRef }) MaterialCard:ElementRef;
    @ViewChild('icon', {static: true}) Icon: ElementRef;

   // public hoy = moment(new Date);
    public DateActual = new Date();
    public anioActual;
    //public DateActual: this.DateActual2.getYear();//  Date = new Date();

    public page: number;
    public prev_enable: Boolean;
	public next_page: number;
	public prev_page: number;

    public total: number;
    public pages: number;
    public pagination:number;
    public users: User[];
    public status: string;
    public userPageId:string;


    public urlImage: string;



  	constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService    :   UserService,
      ) {
        this.urlImage = GLOBAL.urlcloudinary;
        this.anioActual = this.DateActual.getFullYear();
      }


  	ngOnInit(): void {

        this.actualPage();
        this.prev_enable = false;
	}

	getUsers(page){
        this._userService.getUsers(page).subscribe(
            response =>{
                if(!response.users){
                    this.status = 'error'
                }else{
                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                  //  this.pagination = this.pages.fill().map((x,i)=>i); // [0,1,2,3,4]
                    if(page > this.pages){
                        this._router.navigate(['/principal', 1]);
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

    show(Id:string, event){


        var elemId = event.target.id;//Icon
        document.getElementById(elemId).classList.add('fa-spin-fast');
        document.getElementById('card'+Id).classList.contains('mc-active');//Card 2

        if ( document.getElementById('card'+Id).classList.contains('mc-active'))
        {
            document.getElementById('card'+Id).classList.remove('mc-active');
            document.getElementById(elemId).classList.remove('fa-spin-fast');
            document.getElementById(elemId).classList.add("mc-btn-action_desactivate");
        }else{
            document.getElementById('card'+Id).classList.add('mc-active');
            document.getElementById(elemId).classList.remove('fa-bars');
            document.getElementById(elemId).classList.remove('fa-spin-fast');
            document.getElementById(elemId).classList.add('fa-arrow-left');
            document.getElementById(elemId).classList.add("mc-btn-action_activate");
        }


    }

    ConvertAge(aioBirth:string){
       let anio = parseInt(aioBirth);
       let anioActual = parseInt(this.anioActual);
       let res = (anioActual-anio);
        return (res)
    }

    ConvertGenero(inSexo: Number){
        switch (inSexo) {
            case 0: return ('Mujer') ;   break;
            case 1: return ('Hombre') ;  break;
            default:  return ('X') ;  break;
        }
    }


    arrayOne(n: number): any[] {
        return Array(n);
    }

}
