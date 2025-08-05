import { Item } from './../item';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-todo-component',
  templateUrl: './to-do.component.html'
})
export class ToDoComponent implements OnInit {
  allItems = [{ id:1,name:"Test",isComplete:true}];
  
  showChild: boolean = false; 

  constructor(private appService: AppService) {}
  ngOnInit() {

    (async () => {
      this.allItems = this.appService.getData();      
      this.appService.itemsEmitted.asObservable().subscribe((value: any) => {
        console.log('this.allItems - ', value);
        this.allItems = value;
      });
    })();
   
  }

  toggleChildComponent(): void {
    this.showChild = !this.showChild; 
  }

  filter: "all" | "active" | "done" = "all";

  get items() {
    return this.allItems;
  }

  receivedAddedItem: Item;

  receiveValueFromAddItem(item: Item) {
    
    console.log('item (inside receiveValueFromAddItem) - ', item);

    this.receivedAddedItem = item; // Update todo's data with the add item value    
    if (this.receivedAddedItem.isComplete.toString().toLowerCase() === "true")
      this.receivedAddedItem.isComplete = true;
    else
      this.receivedAddedItem.isComplete = false;

    console.log('this.receivedAddedItem - ', this.receivedAddedItem);
    this.handleAdd();
  }

  handleAdd(): void {
    console.log('Add task button clicked!'); 
    
    //itemValue: Item;

    /*
    1. call a child component.
    2. capture the returned Item value from there.
    3. call below appservice.additem method with the 
       Item value as parameter.
      OR - display a child component on button click event
    */
    
    this.appService.addItem(this.receivedAddedItem);
  }

  handleDelete(itemValue: Item): void {
    console.log('Delete task button clicked! - ', itemValue);   
    this.appService.deleteItem(itemValue); 
  }
}
