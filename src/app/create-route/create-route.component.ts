import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { RoutesService } from '../services/routes-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipment } from '../models/equipment';
import { EquipmentService } from '../services/equipment-service';
import { Terrain, Difficulty, Endurance, Type } from '../models/enums';
import { Router, ActivatedRoute } from '@angular/router';

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
  isEditMode: boolean = false;


  constructor(private routeService: RoutesService, private formBuilder:FormBuilder, private equipmentService: EquipmentService, private router:Router, private activateRoute: ActivatedRoute) {
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
      
      this.activateRoute.paramMap.subscribe(params => {
        const tripId = params.get('id');
        if(tripId){
          debugger;
            this.routeService.getRoute(tripId).subscribe((trip) => this.editRoute(trip));
        }
      });
      
    });

    this.terrainLabels = this.getNames(this.terrain);
    this.difficultyLabels = this.getNames(this.difficulty);
    this.typeOfRouteLabels = this.getNames(this.typeRoute);  
    this.enduranceLabels = this.getNames(Endurance);
  }

  editRoute(route: Trip){    
    this.isEditMode = true;
    this.routeForm.patchValue({
      _name: route.name,
      _info: route.info,
      _startDest: route.startPoint,
      _endDest: route.destination,
      _startTime: route.startTime,
      _terrain: route.terrain,
      _typeOfRoute: route.type,
      _endurance: route.endurance,
      _difficulty: route.difficulty,
      _suitableForKids: route.suitableForKids,
      equipments: this.routeEquipments
    });
  }

  saveChanges(){
    this.routeService.edit(this.routeModel).subscribe((trip) => {
      this.router.navigate(['route/:input',trip.id]);
    });
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
    }
    else{
        this.routeModel.equipmentsIds.push(equipment.id);   
    }
  }

  getNames(types:any) :string[]{
    var options = Object.keys(types);
    return options.slice(options.length / 2);
  }
}
