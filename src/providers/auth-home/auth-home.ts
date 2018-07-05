//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthHomeProvider {

  data: any;
  private API_URL = 'http://jsonplaceholder.typicode.com/photos';    

  constructor(public http: Http) {
    
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
  
    return new Promise(resolve => {
      this.http.get(this.API_URL)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

 /* consultarDados() {
    return new Promise((resolve, reject) => {
  
      this.http.get(this.API_URL)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }*/

}
