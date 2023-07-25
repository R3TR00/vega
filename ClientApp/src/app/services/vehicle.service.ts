import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';
  constructor(private http: HttpClient) { }
  getMakes(){
    return this.http.get('/api/makess')

  }
  getFeatures(){
    return this.http.get('/api/features')
  }
  create(vehicle){
    return this.http.post(this.vehiclesEndpoint,vehicle)
  }
  getVehicle(id){
    return this.http.get(this.vehiclesEndpoint + '/' +  id)
  }
  delete(id){
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
  }
  getVehicles() {
    return this.http.get(this.vehiclesEndpoint)
  }

}
