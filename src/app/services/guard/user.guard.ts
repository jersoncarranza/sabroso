
import{UserService} from '../../services/user/user.service';
import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';


@Injectable()
export class UserGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userService: UserService
    ){}


    canActivate(){
        let identity = this._userService.getIdendity();
        if(identity){
            return true;
        }else{
            this._router.navigate(['/login']);
            return false;
        }
    }

    canActivate2(){
        let identity = this._userService.getIdendity();
        if(identity){
            return true;
        }else{
            this._router.navigate(['/login']);
            return false;
        }
    }


}
