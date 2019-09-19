import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from '../models/trip';
import { RoutesService } from '../services/routes-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Equipment } from '../models/equipment';
import { EquipmentService } from '../services/equipment-service';
import { Terrain, Difficulty, Endurance, Type } from '../models/enums';
import { Router, ActivatedRoute } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { GeocodingService } from '../services/geocoding-service';

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
  difficultyLabels: string[] = [];
  typeOfRouteLabels: string[] = [];
  routeForm: FormGroup;
  isEditMode: boolean = false;


  constructor(private routeService: RoutesService, private formBuilder: FormBuilder, private equipmentService: EquipmentService, private router: Router, private activateRoute: ActivatedRoute, private geocodingService: GeocodingService) {
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

      this.activateRoute.paramMap.subscribe(params => {
        const tripId = params.get('id');
        if (tripId) {
          debugger;
          this.routeService.getRoute(tripId).subscribe((trip) => this.editRoute(trip));
        }
      });

      this.validateStartPoint();
      this.validateDestination();

    });

    this.terrainLabels = this.getNames(this.terrain);
    this.difficultyLabels = this.getNames(this.difficulty);
    this.typeOfRouteLabels = this.getNames(this.typeRoute);
    this.enduranceLabels = this.getNames(Endurance);
  }

  editRoute(route: Trip) {
    //todo userId is not passed
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

  saveChanges() {
    this.routeService.edit(this.routeModel).subscribe((trip) => {
      this.router.navigate(['route/:input', trip.id]);
    });
  }

  addRoute() {
    console.log(this.routeModel);
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

  getNames(types: any): string[] {
    var options = Object.keys(types);
    return options.slice(options.length / 2);
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
