import { Component, OnInit } from '@angular/core';
import { FlimServiceService } from '../service/flim-service.service'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as alasql from 'alasql';


@Component({
  selector: 'app-flim-details',
  templateUrl: './flim-details.component.html',
  styleUrls: ['./flim-details.component.css']
})
export class FlimDetailsComponent implements OnInit {
  flimDetailsData:Array<object>=[];
  flimTitleCount:number;
  displayFlimDetails:any;
  loadSaveSpinner:boolean=true;
  constructor(private flimServices:FlimServiceService) {
    this.displayFlimDetails=[];
   }

  ngOnInit() {
    this.loadTitleCount();
    this.loadFlimdata();
  }
  loadTitleCount(){
    this.flimServices.getFlimtitleCount().subscribe(data=>{
      this.flimTitleCount=data.count;
      this.getAllFlimTitles(data.count);
    })
  }
  currentIndex: any = [];
  loadFlimdata() {
    this.flimServices.getFlimData().subscribe(data => {
      this.flimDetailsData = data.results;
      for (let i = 0; i < data.results.length; i++) {
        let stroeindex = [];
        let flimdata = data.results[i].films;
        for (let j = 0; j < flimdata.length; j++) {
          stroeindex.push(flimdata[j].match(/[0-9]+/).toString())
        }
        this.currentIndex.push({ 'index': i, 'value': stroeindex });
      }

    })
  }

  getAllFlimTitles(count){
    let storeTempTitle=[];
    for(let i=1;i<=count;i++){
      this.flimServices.loadEachTitle('https://swapi.co/api/films/'+i).subscribe(data=>{
        storeTempTitle.push({'id':i,'title':data.title});
       this.combineArrayItems(storeTempTitle)
      })
    }
  }

  combineArrayItems(storeTempTitle) {
    if (storeTempTitle.length == this.flimTitleCount) {
      for (let i = 0; i < this.currentIndex.length; i++) {
        let ArrayIndex: any = [];
        let values = this.currentIndex[i].value;
        for (let j = 0; j < values.length; j++) {
          ArrayIndex.push({ 'id': +values[j] })
        }
        var queryresult = alasql('SELECT b.id, a.title from ? as a,? as b WHERE a.id=b.id', [storeTempTitle, ArrayIndex]);
        if (this.currentIndex[i]) {
          var obj = {
            name: this.flimDetailsData[i]['name'],
            gender: this.flimDetailsData[i]['gender'],
            birth_year: this.flimDetailsData[i]['birth_year'],
            flimtitle: queryresult
          }
          this.loadSaveSpinner = false;
          this.displayFlimDetails.push(obj);
        }
      }
    }
  }
}
