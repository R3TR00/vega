import * as _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {forkJoin} from 'rxjs';
import { SaveVehicle, Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit{
  makes: any;
  models: any;
  vehicle: SaveVehicle = {
    makeId:0,
    modelId:0,
    isRegistered: false,
    features:[],
    contact:{
      name:'',
      email:'',
      phone:''
    },
    id:0
  };
  features: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) {
      this.vehicle.id=0;
      route.params.subscribe(p=> {
        this.vehicle.id = +p['id'];
      });
    
  }
  ngOnInit(): void {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if(this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))

    forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      if(this.vehicle.id)
        this.setVehicle(data[2]);
        this.populateModels();
    }, err => {
        if(err.status == 404)
          this.router.navigate(['/']);
    });
   }
   private setVehicle(v){
      this.vehicle.id = v.id;
      this.vehicle.makeId = v.make.id;
      this.vehicle.modelId = v.model.id;
      this.vehicle.isRegistered = v.isRegistered;
      this.vehicle.contact = v.contact;
      this.vehicle.features = _.pluck(v.features,'id')

   }
  onMakeChange(){
    this.populateModels();
    console.log("Vehicle",this.vehicle);
   
    //delete this.vehicle.modelId;
  }

  private populateModels(){
    var selectedMake = this.makes.find((m: { id: any; }) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];

  }

  onFeatureToggle(featureId: any,$event){
      if($event.target.checked){
        this.vehicle.features.push(featureId);
      }else{
        var index = this.vehicle.features.indexOf(featureId);
        this.vehicle.features.splice(index,1);
      }
  }
  submit(){
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x)); 
  }
  delete(){
    if(confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x =>{
          this.router.navigate(['/']);
        });
    }
  }
}
