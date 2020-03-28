import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {Router, ActivatedRoute } from '@angular/router';
import {MDCTopAppBar} from "@material/top-app-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   // @ViewChild('input,button', {static: false}) searchElement: ElementRef;
    public identity;
    constructor(
        private _router: Router
    )
    {
     }

    ngOnInit() {
    // const list = MDCList.attachTo(document.querySelector('.mdc-list'));

    const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

        const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        topAppBar.setScrollTarget(document.getElementById('main-content'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
        });

    }

    logout(){
		localStorage.clear();
		this.identity = null;
		this._router.navigate(['/login']);
	}


}

