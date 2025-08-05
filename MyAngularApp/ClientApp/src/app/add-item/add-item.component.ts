import { Item } from './../item';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'add-item-component',
  templateUrl: './add-item.component.html'
})
export class AddItemComponent implements OnInit {

  checkoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.checkoutForm = this.formBuilder.group({
      name: '',
      isComplete: ''
    });
  }

  userForm = new FormGroup({
    name: new FormControl(''),
    isComplete: new FormControl('')
  });

  @Output() valueEmitted = new EventEmitter<Item>(); 

  sendValueToToDo(item: Item) {
    console.log('item(inside sendValueToToDo) - ', item);
    this.valueEmitted.emit(item);
  }
  
  ngOnInit() {
   console.log('add item component called.');
  }

  //onSubmit(formData: any) {
  onSubmit() {
    // You can send this data to a backend service here
    
    console.log('Form Submitted!', this.userForm.value);
    console.log('Form Submitted!', this.userForm.value.isComplete);

    this.sendValueToToDo(this.userForm.value);

    //console.log('Form has been submitted - ', this.checkoutForm.value);
    //this.checkoutForm.reset();
  }

}
