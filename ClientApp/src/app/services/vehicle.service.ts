import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }
  getMakes(){
    return this.http.get('/api/makess')

  }
  getFeatures(){
    return this.http.get('/api/features')

  }
}