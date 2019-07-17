import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { RoutesService } from '../services/routes-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipment } from '../models/equipment';
import { EquipmentService } from '../services/equipment-service';
import { Terrain, Difficulty, Endurance, Type } from '../models/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  routeModel: Trip = new Trip();
  routeEquipments: Equipment[] = [];
  terrain = Terrain;
  difficulty= Difficulty;
  endurance = Endurance;
  typeRoute = Type;
  enduranceLabels: string[] = [];
  terrainLabels: string[] = [];
  difficultyLabels: string[] = [];
  typeOfRouteLabels: string[] = [];
  routeForm: FormGroup;


  constructor(private routeService: RoutesService, private formBuilder:FormBuilder, private equipmentService: EquipmentService, private router:Router) {
    this.routeForm = this.formBuilder.group({
       '_name':['', Validators.required],
       '_info':['', Validators.required],
       '_startDest': ['', Validators.required],
       '_endDest':['', Validators.required],
       '_startTime':['', Validators.required],
       '_terrain':[''],
       '_suitableForKids':[''],  
      '_typeOfRoute':[''],
      '_difficulty':[''],
      '_endurance':[''],     
      'equipments': ['']
    });
   }

  ngOnInit() {
    this.equipmentService.getEquipments().subscribe(equipments => {
      this.routeEquipments = equipments;
      console.log(this.routeEquipments);     
    });

    this.terrainLabels = this.getNames(this.terrain);
    this.difficultyLabels = this.getNames(this.difficulty);
    this.typeOfRouteLabels = this.getNames(this.typeRoute);  
    this.enduranceLabels = this.getNames(Endurance);

  }

  addRoute(){
    this.routeService.createRoute(this.routeModel).subscribe((ok) => {
     this.router.navigate(['mytrips']);
     console.log(this.routeModel);
    }), (err) => {
      console.log(err);
    };
  }

  addToEquipments(equipment: Equipment):void{
    this.routeEquipments.find
    var current = this.routeModel.equipmentsIds.indexOf(equipment.id);
    if(current != -1){
      this.routeModel.equipmentsIds.splice(current, 1);
      console.log(this.routeModel.equipmentsIds);                  
    }
    else{
        this.routeModel.equipmentsIds.push(equipment.id);   
        console.log(this.routeModel.equipmentsIds);
    }
  }

  getNames(types:any) :string[]{
    var options = Object.keys(types);
    return options.slice(options.length / 2);
  }
}
