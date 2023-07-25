import { VehicleService } from './../services/vehicle.service';
import { Component, OnInit } from "@angular/core";
import { Vehicle } from "../models/vehicle";

@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit{
    vehicles: any;

    constructor(private VehicleService: VehicleService) { }
    
    ngOnInit(){
        this.VehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = vehicles);
    }
    
}