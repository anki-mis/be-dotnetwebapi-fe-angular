
/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
*/

import { Component } from "@angular/core";

@Component({
  /*standalone: true,*/
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //componentTitle = "My To Do List";
  title = "My App";

  filter: "all" | "active" | "done" = "all";

  allItems = [
    { description: "design", done: true },
    { description: "develop", done: false },
    { description: "test", done: false },
    { description: "deploy", done: false },
  ];

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done,
    );
  }
}