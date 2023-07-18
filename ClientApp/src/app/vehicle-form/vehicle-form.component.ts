import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit{
  makes: any;
  models: any;
  vehicle: any = {
    features:[],
    contact:{}
  };
  features: any;
  constructor(
    private vehicleService: VehicleService) {
    
    
  }
  ngOnInit(): void {
    this.vehicleService.getMakes().subscribe(makes=>{
      this.makes = makes;});
      this.vehicleService.getFeatures().subscribe(features => this.features = features)
  }
  onMakeChange(){
    console.log("Vehicle",this.vehicle);
    var selectedMake = this.makes.find((m: { id: any; }) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
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
}
