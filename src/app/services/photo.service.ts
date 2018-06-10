import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class PhotoService {
   private _producturl='https://jsonplaceholder.typicode.com/photos';

   constructor(private _http: HttpClient){}

   getData() {
      return this._http.get(this._producturl);
   }
}
