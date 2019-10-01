import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {} from 'googlemaps';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild("map", { static: false }) mapElement: ElementRef;
  map: google.maps.Map;
  public lat: Number;
  public lng: Number;

  @Input() origin: any;
  @Input() destination: any;
  travelMode: string = 'WALKING';

  constructor() { }

  ngOnInit() {
    if (!this.origin || !this.destination) {
      return;
    }
  }

  public ngAfterViewInit() {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
}
