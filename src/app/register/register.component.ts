import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Terrain, Type, Difficulty, Endurance} from '../models/enums';
import { Authorization} from '../services/authorization';
import { Router } from '@angular/router';
import { EquipmentService } from '../services/equipment-service';
import { Equipment } from '../models/equipment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  equipmentModel: Equipment[] = [];
  registerModel: User = new User();
  registerForm: FormGroup;
  error: HttpErrorResponse;
  terrain = Terrain;
  difficulty= Difficulty;
  endurance = Endurance;
  typeOfRoute = Type;
  enduranceLabels: string[] = [];
  terrainLabels: string[];
  difficultyLabels: string[];
  typeOfRouteLabels: string[];
  success:boolean = true;

  constructor(private equipments:EquipmentService, private formBuilder:FormBuilder, private authorizator: Authorization, private route:Router) {
    this.registerForm = this.formBuilder.group({
      '_email':['', Validators.required],
      '_password':['', Validators.required],
      'first_name':['', Validators.required],
      'last_name':['', Validators.required],
      '_terrain':[''],
      '_typeOfRoute':[''],
      '_difficulty':[''],
      '_endurance':[''],   
      'equipments': ['']
    });
   }

  ngOnInit() {
    this.equipments.getEquipments().subscribe((equipments) =>{
       this.equipmentModel = equipments; 
    });
    
    this.terrainLabels = this.getNames(this.terrain);
    this.difficultyLabels = this.getNames(this.difficulty);
    this.typeOfRouteLabels = this.getNames(this.typeOfRoute);  
    this.enduranceLabels = this.getNames(Endurance);
  }

  register(){
    this.authorizator.register(this.registerModel).subscribe((ok) => {
      if(ok){ this.route.navigate(['login']); }
    }, (error) =>{
      this.success = false;      
      console.log(error);
    });
  }

  addToEquipments(equipment: Equipment):void{
    console.log(equipment);
    this.equipmentModel.find
    var current = this.registerModel.equipments.indexOf(equipment.id);
    if(current != -1){
      this.registerModel.equipments.splice(current, 1);                  
    }
    else{
        this.registerModel.equipments.push(equipment.id);   
    }
  }

  getNames(types:any) :string[]{
    var options = Object.keys(types);
    return options.slice(options.length / 2);
  }
}
