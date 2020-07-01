import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from '../../services/user/global';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

    public token;
    public url: string;
    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.urlPublic;
    }

    getUsers(page = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        return this._http.get(this.url + 'admin/users-client/'+ page,{headers:headers});
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

    //Change
    updateEstadoUser(iduser: String, checked: Boolean){
        let status =  checked == true? 1 : 0;
        let data = {
            iduser: iduser,
            estado: status
        }
        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        return this._http.post(this.url + 'admin/change-estado/',params, {headers:headers});
    }

    getModels(page = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        return this._http.get(this.url + 'admin/users-model/'+ page,{headers:headers});
    }

    getModelsAll(page = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        return this._http.get(this.url + 'admin/users-model-all/'+ page,{headers:headers});
    }

}
