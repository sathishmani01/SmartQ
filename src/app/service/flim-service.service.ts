import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FlimServiceService {
  private apiUrl ='https://thesmartq.firebaseio.com/menu.json';
  
  constructor(private http:Http) { 
    console.log('From Flim Service..')
  }
  
  getfoodData(){
    return this.http.get(this.apiUrl).map((res :Response) => res.json());
  }
}

