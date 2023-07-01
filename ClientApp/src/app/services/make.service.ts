import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http: HttpClient) { }
  getMakes(){
    return this.http.get('/api/makess').pipe(map((response: any) => response.json()));

  }
}
