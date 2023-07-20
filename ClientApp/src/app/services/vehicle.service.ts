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
  create(vehicle){
    return this.http.post('/api/vehicles',vehicle)
  }
  getVehicle(id){
    return this.http.get('/api/vehicles/'+ id)
  }
  delete(id){
    return this.http.delete('/api/vehicles/'+ id)
  }
}
