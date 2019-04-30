import { Component, OnInit } from '@angular/core';
import {MydataService} from'../mydata.service';
import{Http, Response, Headers, RequestOptions} from '@angular/http';
import{SignupComponent} from'../signup/signup.component'
@Component({
  selector: 'app-getdata',
  templateUrl: './getdata.component.html',
  styleUrls: ['./getdata.component.css'],
  providers:[MydataService]
})
export class GetdataComponent implements OnInit {
  
  test: any[];
  datatobeedited:any;
  update:boolean=false;
  name:any;
  constructor(private _mydataService:MydataService,private _http:Http) {  }
 ngOnInit() {
 this._mydataService.getData().subscribe((testData)=>this.test=testData)
 }

 deleteData(name:any)
 {
   console.log(name);
   this._mydataService.deleteData(name).subscribe((testData)=>this.test=testData)
 }

 editData(i:any)
 {
  
   this.update=true;
   this.datatobeedited=i;
   console.log("obj is"+this.datatobeedited.name);
 }
 saveUpdate(datatobesaved:any)
 {
   console.log("datatobesaved"+datatobesaved.name);
   console.log("datatobesaved"+datatobesaved.name+''+' '+datatobesaved.email+''+
                            ''+datatobesaved.mobile+''+''+datatobesaved._url+''+
                            ''+datatobesaved.description);
       
   let _url="http://localhost:3000/api/data"+"/"+datatobesaved._id;
 
 var headers= new Headers();
 headers.append('Content-Type', 'application/json');
 let options = new RequestOptions({ headers: headers });
 
this._http.put(_url,datatobesaved, options)
         .subscribe(data => {
               alert('saved Successfully');
         }, error => {
             console.log(JSON.stringify(error.json()));
         })

 }

}



