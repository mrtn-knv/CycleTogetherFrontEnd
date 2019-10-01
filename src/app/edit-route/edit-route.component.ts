import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../_services/routes-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../_models/trip';
import { Equipment } from '../_models/equipment';
import { Endurance, Type, Terrain } from '../_models/enums';
import { EnumNameGetter } from '../_helpers/enum-name-getter';
import { distinctUntilChanged, debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { GeocodingService } from '../_services/geocoding-service';
import { Subject } from 'rxjs';
import { EquipmentService } from '../_services/equipment-service';
import { TokenGetter } from '../_helpers/token-getter';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {

  tripId: string;
  routeToEdit: Trip = new Trip();
  isEditMode: boolean = false;
  editForm: FormGroup;
  equipments: Equipment[] = [];
  endurance = Endurance;
  typeRoute = Type;
  terrain = Terrain;
  enduranceLabels: string[] = [];
  terrainLabels: string[] = [];
  typeOfRouteLabels: string[] = [];

  constructor(private routeService: RoutesService, 
              private formBuilder: FormBuilder, 
              private activateRoute: ActivatedRoute, 
              private enumGetter: EnumNameGetter,
              private geocodingService: GeocodingService,
              private equipmentService: EquipmentService,
              private tokenGetter: TokenGetter,
              private router: Router) { 
    this.editForm = this.formBuilder.group({
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
    this.activateRoute.paramMap.subscribe(params => {
      this.tripId = params.get('id');
      if(this.tripId){
          this.routeToEdit.id = this.tripId;
          this.routeService.getRoute(this.tripId).subscribe((trip) => {
            this.editRoute(trip)
          }, (err) => {
            console.log(err);
          });
      }
    });

    this.equipmentService.getEquipments().subscribe(equipments => {
      this.equipments = equipments;
    });

    this.validateStartPoint();
    this.validateDestination();

    this.terrainLabels = this.enumGetter.getNames(this.terrain);
    this.typeOfRouteLabels = this.enumGetter.getNames(this.typeRoute);
    this.enduranceLabels = this.enumGetter.getNames(Endurance);
  }
  editRoute(route: Trip) {
    this.isEditMode = true;
    this.editForm.patchValue({
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
      // equipments: route.equipmentsIds
    });
  }

  saveChanges() {
    this.routeToEdit.userId = this.tokenGetter.getUserId();
    console.log(this.routeToEdit);
    this.routeService.edit(this.routeToEdit).subscribe((trip) => {
      this.router.navigate(['route/'+ trip.id]);
    });
  }

  cancel(){
    this.router.navigate(['route/'+this.tripId]);
  }

  private validateStartPoint() {
    this.editForm.controls._startDest.valueChanges
      .pipe(
        debounceTime(20),
        distinctUntilChanged(),
        filter(address => {
          address = address.trim();
          if (address.length < 5) {
            this.routeToEdit.startPoint = null;
          }
          return address.length >= 5;
        }),
        switchMap(address => this.geocodingService.validateAddress(address)))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result.results.length > 0) {
          this.routeToEdit.startPoint = this.generateName(this.editForm.controls._startDest.value, result.results[0].formatted_address);
        } else {
          this.routeToEdit.startPoint = null;
        }
      });
  }

  private validateDestination() {
    this.editForm.controls._endDest.valueChanges
      .pipe(
        debounceTime(20),
        distinctUntilChanged(),
        filter(address => {
          address = address.trim();
          if (address.length < 5) {
            this.routeToEdit.destination = null;
          }
          return address.length >= 5;
        }),
        switchMap(address => this.geocodingService.validateAddress(address)))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result.results.length > 0) {
          this.routeToEdit.destination = this.generateName(this.editForm.controls._endDest.value, result.results[0].formatted_address)
        } else {
          this.routeToEdit.destination = null;
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
