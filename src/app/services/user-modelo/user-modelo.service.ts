import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from '../../services/user/global';
import { User} from '../../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserModeloService {

    public url: string;
	public token;
    constructor(
        public _http: HttpClient
    ) {
        this.url =GLOBAL.urlPublic;
    }

    //api.get('/user/:id?', userMiddleware.ensureAuth, userController.getUserModelo);

	getToken(){
		let token = localStorage.getItem('token');
			if(token != "undefined"){
				this.token = token;
			}else{
				this.token;
			}
			return this.token;
		  }



    ////////////////
    getUserModelo(UserId: String): Observable<any>{
        this.getToken();
        console.log('UserId'+UserId);
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization', this.token);
        return this._http.get(this.url+'user/get-user/' + UserId, {headers:headers});
    }

    EditUserModelo(user: User): Observable<any>{

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());
        return this._http.put(this.url+'user'+ '/edit-user-modelo/'+ user._id, params,{headers:headers})
    }

    EditRedSocial(red:String, tipo:Number ): Observable<any>{
        let data = {
            red: red,
            tipo: tipo
        }

        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());
        return this._http.put(this.url+'user/edit-red', params,{headers:headers})
    }



}
