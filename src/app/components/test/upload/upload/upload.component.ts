import { Component, OnInit } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from '../../../../services/user/global';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';
import {UploadService} from '../../../../services/upload/upload.service'
const URL = 'http://localhost:4000/user/upload2';
const UploadURL = 'http://localhost:4000/user/upload';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css'],
    providers:[UploadService]
})
export class UploadComponent implements OnInit {
    title = 'Upload a File';

    public uploader2: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

    fileToUpload: File = null;
    uploader:FileUploader;
    hasBaseDropZoneOver:boolean;
    hasAnotherDropZoneOver:boolean;
    response:string;

    //public url: string;
    public token;
    constructor(
        public _service: UploadService,
        public _http: HttpClient
    ) {
      //  this.url = GLOBAL.url;
        this.uploader = new FileUploader({
            url: URL,
            disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
            formatDataFunctionIsAsync: true,
            formatDataFunction: async (item) => {
              return new Promise( (resolve, reject) => {
                resolve({
                  name: item._file.name,
                  length: item._file.size,
                  contentType: item._file.type,
                  date: new Date()
                });
              });
            }
          });

          this.hasBaseDropZoneOver = false;
          this.hasAnotherDropZoneOver = false;

          this.response = '';

          this.uploader.response.subscribe( res => this.response = res );

    }

  ngOnInit(): void {
    this.uploader2.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader2.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
    }

/*
    getToken(){
        let token = localStorage.getItem('token');
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token;
        }
        return this.token;
    }

    fileData    : File = null;
    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.fileData = <File>fileInput.target.files[0];

    }
    */

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
      }

      public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
      }

handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('here 98');
    this.uploadFileToActivity()
}

uploadFileToActivity() {
    this._service.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }


  up(){
      console.log("listo");
    this._service.makeFileRequestClientPay(
        'localhost:4000/user/upload-pay-cloudinary/:12345',//+ response.user._id,
        [],
        this.filesToUpload,
            'image')
        .then((result:any)=>{
            //this.user.image = result.status;
            //console.log('rsult : '+result.status);

            if (result.status == 1) {
               // this.Form.reset();
               // this._router.navigate(['/login']);
               // alertify.alert('Correcto', 'Estimad@ '+result.user.nombres+' su pago será revisado y el usuario habilitado '+'<a>'+ result.user.email+'</a>');

                this.filesToUpload = null;
            }else{
             //   alertify.alert('error', 'Intente de nuevo');
            }
           // this.loading = false;


        });
  }
  fileData    : File = null;
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
      this.fileData = <File>fileInput.target.files[0];
  }

}
