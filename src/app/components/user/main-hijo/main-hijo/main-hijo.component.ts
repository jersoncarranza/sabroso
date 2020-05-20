import { Component, OnInit, Directive, Input, ContentChildren, QueryList, ViewChild, ContentChild } from '@angular/core';

// @Directive({selector: 'pane'})
// export class Pane {
//   @Input() id!: string;
// }

@Component({
  selector: 'card',
  templateUrl: './main-hijo.component.html',
  styleUrls: ['./main-hijo.component.css']
})
export class MainHijoComponent implements OnInit {

    @ViewChild("h1") h1;
    @ContentChild("insideNgContent") insideNgContent;
    @Input() type: string = "success";

/*
    @ContentChildren(Pane) topLevelPanes!: QueryList<Pane>;
    @ContentChildren(Pane, {descendants: true}) arbitraryNestedPanes!: QueryList<Pane>;

    get serializedPanes(): string {
      return this.topLevelPanes ? this.topLevelPanes.map(p => p.id).join(', ') : '';
    }
    get serializedNestedPanes(): string {
      return this.arbitraryNestedPanes ? this.arbitraryNestedPanes.map(p => p.id).join(', ') : '';
    }
    */

  constructor() { }


  ngOnInit(): void {
  }

  alert() {
    console.log("alert");
  }

}
