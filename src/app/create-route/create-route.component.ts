import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from '../_models/trip';
import { RoutesService } from '../_services/routes-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Equipment } from '../_models/equipment';
import { EquipmentService } from '../_services/equipment-service';
import { Terrain, Difficulty, Endurance, Type } from '../_models/enums';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GeocodingService } from '../_services/geocoding-service';
import { TokenGetter } from '../_helpers/token-getter';
import { EnumNameGetter } from '../_helpers/enum-name-getter';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  routeModel: Trip = new Trip();
  routeEquipments: Equipment[] = [];
  terrain = Terrain;
  difficulty = Difficulty;
  endurance = Endurance;
  typeRoute = Type;
  enduranceLabels: string[] = [];
  terrainLabels: string[] = [];
  typeOfRouteLabels: string[] = [];
  difficultyLabels: string[] = [];
  routeForm: FormGroup;
  isEditMode: boolean = false;
  token:any;
  idUser: any;


  constructor(private routeService: RoutesService,
              private formBuilder: FormBuilder, 
              private equipmentService: EquipmentService, 
              private router: Router, 
              private activateRoute: ActivatedRoute, 
              private geocodingService: GeocodingService,
              private tokenGetter: TokenGetter,
              private enumGetter: EnumNameGetter) {
    this.routeForm = this.formBuilder.group({
      '_name': ['', Validators.required],
      '_info': ['', Validators.required],
      '_startDest': ['', [Validators.required, Validators.minLength(5)]],
      '_endDest': ['', [Validators.required, Validators.minLength(5)]],
      '_startTime': ['', Validators.required],
      '_terrain': [''],
      '_suitableForKids': [''],
      '_typeOfRoute': [''],
      '_difficulty': [''],
      '_endurance': [''],
      'equipments': ['']
    });
  }

  ngOnInit() {
    this.equipmentService.getEquipments().subscribe(equipments => {
      this.routeEquipments = equipments;

      this.validateStartPoint();
      this.validateDestination();

    });

    this.terrainLabels = this.enumGetter.getNames(this.terrain);
    this.typeOfRouteLabels = this.enumGetter.getNames(this.typeRoute);
    this.enduranceLabels = this.enumGetter.getNames(this.endurance);
  }

  addRoute() {
    this.routeModel.userId = this.tokenGetter.getUserId();
    this.routeService.createRoute(this.routeModel).subscribe((ok) => {
      this.router.navigate(['mytrips']);
      console.log(this.routeModel);
    }), (err) => {
      console.log(err);
    };
  }

  addToEquipments(equipment: Equipment): void {
    this.routeEquipments.find
    var current = this.routeModel.equipmentsIds.indexOf(equipment.id);
    if (current != -1) {
      this.routeModel.equipmentsIds.splice(current, 1);
    }
    else {
      this.routeModel.equipmentsIds.push(equipment.id);
    }
  }


  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;

  options = {
    types: [],
    componentRestrictions: { country: 'BG' }
  };

  public changeStartPoint(address: Address) {
    
    this.routeModel.startPoint = this.generateName(address.name, address.formatted_address);
    this.routeForm.controls._startDest.setValue(this.routeModel.startPoint);
    console.log(this.routeModel.startPoint);
  }

  public changeDestination(address: Address) {
    this.routeModel.destination = this.generateName(address.name, address.formatted_address);
    this.routeForm.controls._endDest.setValue(this.routeModel.destination);
  }

  

  private validateStartPoint() {
    this.routeForm.controls._startDest.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(address => {
          address = address.trim();
          if (address.length < 5) {
            this.routeModel.startPoint = null;
          }
          return address.length >= 5;
        }),
        switchMap(address => this.geocodingService.validateAddress(address)))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result.results.length > 0) {
          this.routeModel.startPoint = this.generateName(this.routeForm.controls._startDest.value, result.results[0].formatted_address);
        } else {
          this.routeModel.startPoint = null;
        }
      });
  }

  private validateDestination() {
    this.routeForm.controls._endDest.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(address => {
          address = address.trim();
          if (address.length < 5) {
            this.routeModel.destination = null;
          }
          return address.length >= 5;
        }),
        switchMap(address => this.geocodingService.validateAddress(address)))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result.results.length > 0) {
          this.routeModel.destination = this.generateName(this.routeForm.controls._endDest.value, result.results[0].formatted_address)
        } else {
          this.routeModel.destination = null;
        }
      });
  }

  private generateName(input, apiAddress) {
    let inputAddress = input.split(",")[0];
    if (apiAddress.includes(inputAddress)) {
      return apiAddress;
    } else {
      return `${inputAddress}, ${apiAddress}`;
    }
    
  }

  unsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
