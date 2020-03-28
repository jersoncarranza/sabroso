import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {Tile} from '../../../models/Tile';

@Component({
  selector: 'app-profile-modelo',
  templateUrl: './profile-modelo.component.html',
  styleUrls: ['./profile-modelo.component.css']
})
export class ProfileModeloComponent  implements OnInit {
    public identity;
    public token;
	//public tiles: Tile[];
    constructor(

        private _userService: UserService,
    ) {
        this.identity = this._userService.getIdendity();
	    this.token = this._userService.getToken();
     }

    ngOnInit() {

    }
    public tiles: Tile[] = [
        {text: 'One',    cols: 3, rows: 1, color: 'lightblue' },
        {text: 'Two',    cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three',  cols: 1, rows: 1, color: 'lightpink' },
        {text: 'Four',   cols: 2, rows: 1, color: '#DDBDF1'   },
    ];
    

}


