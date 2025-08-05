import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Item } from './item';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  public itemList: Item[];
  private url: string = "http://localhost:5021";
  public listOfItems: Observable<Item[]> = of([]);

  itemsEmitted: Subject<string>;
  constructor(private http: HttpClient) {
    this.itemsEmitted = new Subject<any>(); 
  }

  public getData(): any {
    //this.http.get('http://localhost:5021/todoitems', { observe: 'response' })
    this.http.get(this.url+'/todoitems', { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          // Success case
          console.log('Status Code:', response.status);
          console.log('Response Body:', response.body[0]);
          this.itemsEmitted.next(response.body);
        },
        (error: HttpErrorResponse) => {
          // Error case
          console.error('Error Status Code:', error.status);
          console.error('Error Message:', error.message);
        }
      );
  }


  public addItem = (item: Item) => {
    console.log('item (inside app.service addItem) - ', item);
    //return this.http.put<Item>(this.url+'/todoitems', item, this.generateHeaders());
    this.http.post(this.url+'/todoitems', item, this.generateHeaders())
      .subscribe(
        (response: HttpResponse<any>) => {
          // Success case
          console.log('Status Code:', response.status);
          console.log('Response Body:', response.body);   
          window.location.reload();       
        },
        (error: HttpErrorResponse) => {
          // Error case
          console.error('Error Status Code:', error.status);
          console.error('Error Message:', error.message);
        }
      );
  }

  public deleteItem = (item: Item) => {
    console.log('item (inside app.service deleteItem) - ', item);
    this.http.delete(this.url+'/todoitems/'+item.id)
      .subscribe(
        (response: HttpResponse<any>) => {
          // Success case
          //console.log('Status Code:', response.status);
          //console.log('Response Body:', response.body);   
          console.log('Response: ', response); 
          window.location.reload();       
        },
        (error: HttpErrorResponse) => {
          // Error case
          //console.error('Error Status Code:', error.status);
          //console.error('Error Message:', error.message);
          console.log('Error: ', error); 
        }
      );
  }

  private generateHeaders = () => {    
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}