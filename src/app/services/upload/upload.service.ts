import { Injectable } from '@angular/core';
import {GLOBAL} from '../global';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from  'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
    public url: string;
    constructor(
        public _http: HttpClient

    ) {
        this.url = GLOBAL.url;
    }

    makeFileRequestModeloRegister(url: string,
         params: Array<string>,
         files: Array<File>,
         name: string){


        return new Promise(function(resolve, reject){
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i=0; i< files.length; i++){
                formData.append(name, files[i], files[i].name)
            }
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization','');
            xhr.send(formData);
        })
    }


    makeFileRequestClientPay(
        url: string,
        params: Array<string>,
        files: Array<File>,
        name: string){

       return new Promise(function(resolve, reject){
           var formData: any = new FormData();
           var xhr = new XMLHttpRequest();
           for(var i=0; i< files.length; i++){
               formData.append(name, files[i], files[i].name)
           }
           xhr.onreadystatechange = function(){
               if(xhr.readyState == 4){
                   if(xhr.status == 200){
                       resolve(JSON.parse(xhr.response));
                   }else{
                       reject(xhr.response);
                   }
               }
           }
           xhr.open('POST', url, true);
           xhr.setRequestHeader('Authorization','');
           xhr.send(formData);
       })
   }


   postFile(fileToUpload: File): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    const endpoint = 'http://localhost:4000/user/image';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name)
    return this._http.post(endpoint, formData, { headers: headers });
                //    .pipe(map(() => { return true; }));
          //   .catch((e) => this.handleError(e));
}

}
