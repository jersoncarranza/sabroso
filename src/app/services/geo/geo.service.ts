import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from '../../services/user/global';
@Injectable({
  providedIn: 'root'
})
export class GeoService {

    public url: string;

    constructor(
        public _http: HttpClient
     ) {
        this.url = GLOBAL.urlPublic;
     }


	getCountries(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+ 'country/'+ 'get-countries' , {headers: headers});
    }


    getCities(idCountry:String): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+ 'country/'+ 'get-cities/'+ idCountry , {headers: headers});
    }


}
