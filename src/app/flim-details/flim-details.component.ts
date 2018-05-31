import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FlimServiceService } from '../service/flim-service.service'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as alasql from 'alasql';
import { FormGroup, FormControl, FormArray, NgForm, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-flim-details',
  templateUrl: './flim-details.component.html',
  styleUrls: ['./flim-details.component.css']
})
export class FlimDetailsComponent implements OnInit {
 foodDataArrayList:any;
 finalDataArrayList:any;
 loadSaveSpinner:boolean=false;
 categoryList1:any;
 checkoutdataList:any;
 checkTotal:number;
  constructor(private flimServices:FlimServiceService) {
   this.foodDataArrayList=[];
   this.categoryList1=[];
   this.finalDataArrayList=[];
   this.checkoutdataList=[];
   }

  ngOnInit() {
    this.loadFlimdata();
  }

  loadFlimdata() {
    this.loadSaveSpinner=true;
    this.flimServices.getfoodData().subscribe(data => {
      this.loadSaveSpinner=false;
      this.foodDataArrayList = data;
      var categoryList= [];
      for(let i=0;i<this.foodDataArrayList.length;i++){
        categoryList.push(this.foodDataArrayList[i].category);
      }
      this.categoryList1 = categoryList.filter(function(item, pos) {
        return categoryList.indexOf(item) == pos;
    })
    
     

    })
  }

  AddRequestedQuantity(x,i){
      x.reqquantity =isNaN(x.reqquantity)? 1:x.reqquantity +1;
      if(this.checkoutdataList.length !=0){
        for(let i=0;i<this.checkoutdataList.length;i++){
          if(x.name == this.checkoutdataList[i].name){
            this.checkoutdataList[i].reqquantity=x.reqquantity;
            this.checkoutdataList[i].price=x.price*x.reqquantity;
          }else{
            this.checkoutdataList.push({
              'reqquantity':x.reqquantity,
              'name':x.name,
              'price':x.price*x.reqquantity
            })
          }
        }
      }else{
        this.checkoutdataList.push({
          'reqquantity':x.reqquantity,
          'name':x.name,
          'price':x.price*x.reqquantity
        })
      }
      this.checkTotal=0;
     for(let j=0;j<this.checkoutdataList.length;j++){
      this.checkTotal +=this.checkoutdataList[j].price;
     }
  }
  removeRequestedQuantity(x){
    this.checkoutdataList=[];
    if(x.reqquantity >=1){
      x.reqquantity =isNaN(x.reqquantity)? 1:x.reqquantity -1;
      this.checkoutdataList.push({
        'reqquantity':x.reqquantity,
        'name':x.name,
        'price':x.price*x.reqquantity
      })
      this.checkTotal=0;
      for(let j=0;j<this.checkoutdataList.length;j++){
       this.checkTotal +=this.checkoutdataList[j].price;
      }
    }
  }
  removeitems(event){
    this.checkoutdataList=[];
    this.checkTotal=null;
  }
}
