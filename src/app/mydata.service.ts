import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MydataService {
  private url1= "http://localhost:3000/api/data";
  
  _url="http://localhost:3000/api/data";
  constructor(private _http:Http) { }

  getData():Observable<any[]>
 {
 return this._http.get(this._url)
.map(function(response:Response){ return <any>response.json()}) 
}

deleteData(name: any):Observable<any[]>
  {
    return this._http.delete(this.url1+"/"+name)
    .map(function(response:Response){{return <any>response.json()}})
  }


}














