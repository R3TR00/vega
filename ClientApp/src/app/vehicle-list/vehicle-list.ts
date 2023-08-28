import { KeyValuePair } from './../models/vehicle';
import { VehicleService } from './../services/vehicle.service';
import { Component, OnInit } from "@angular/core";
import { Vehicle } from "../models/vehicle";

@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit{
    vehicles: any;
    allVehicles: any;
    makes: any;
    filter: any = {};
    constructor(private VehicleService: VehicleService) { }
    
    ngOnInit(){
        this.VehicleService.getMakes()
            .subscribe(makes => this.makes = makes)
        this.VehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = this.allVehicles =vehicles);
    }
    
    onFilterChange(){
        var vehicles = this.allVehicles;

        if(this.filter.makeId)
            vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
        if(this.filter.modelId)
            vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
        
        this.vehicles = vehicles;
    }

    resetFilter(){
        this.filter = {};
        this.onFilterChange();
    }
}