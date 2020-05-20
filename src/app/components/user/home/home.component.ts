import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import{ User} from '../../../models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public user: User;

    public identity;
    public topAppBar: MDCTopAppBar;
    public drawer: MDCDrawer;
    public topAppBarElement: any;
    constructor(
        private _router: Router,
        private _userService    :   UserService,
    )
    {
        this.user       = this._userService.getIdendity();
     }

    ngOnInit() {
        const topAppBarElement  = document.querySelector('.mdc-top-app-bar');
        const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'))
        const topAppBar = new MDCTopAppBar(topAppBarElement);

        topAppBar.setScrollTarget(document.getElementById('scrollbar'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
        });
     }

    logout(){
		localStorage.clear();
		this.identity = null;
		this._router.navigate(['/login']);
	}

    test(){
        const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        const listEl = document.querySelector('.mdc-list');
        const mainContentEl = document.querySelector('.main-content');
    }

    list(){
        const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        drawer.open = false;
    }

}

