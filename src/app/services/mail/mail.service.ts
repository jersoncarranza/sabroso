import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {GLOBAL} from '../global';
@Injectable({
  providedIn: 'root'
})
export class MailService {


    public url: string;
    constructor(public _http: HttpClient) {
      this.url = GLOBAL.url;
     }

     envioGmail(from:string = 'jersoncarranza2@gmail.com',
                to:string   = '' ,
                subject:string = 'Codigo test',
                 text:string = 'No hay nada'):Observable<any>{

        let data = {
            from: from,
            to : to,
            subject:subject,
            text:text
        }
        let params = JSON.stringify(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'email/envio-correo', params,{headers:headers})

      }


}
