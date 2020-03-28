import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User} from '../../models/user';
import {GLOBAL} from '../../services/user/global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    public url: string;
    public identity;
    public token;
    constructor(
      public _http: HttpClient
    ) {

        this.url = GLOBAL.urlPublic;
    }

    register(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'user'+ '/save-user', params,{headers:headers})
    }

    login(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers= new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+ 'user' + '/login', params,{headers:headers})
    }


    getIdendity(){

        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{

            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token;
        }
        return this.token;
    }

}
