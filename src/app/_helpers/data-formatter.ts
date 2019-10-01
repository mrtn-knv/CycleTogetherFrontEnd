import { Injectable } from '@angular/core';
import { Trip } from '../_models/trip';
import { DatePipe } from '@angular/common';
import { TripView } from '../_models/trip-view';

@Injectable()
export class DataFormatter {

    constructor(){}

    public formatStartTime(trips: TripView[]) {
        for (let route of trips) {
          var pipe = new DatePipe('en-US');
          route.dateFormatted = pipe.transform(route.startTime, 'fullDate');
          route.startHour = pipe.transform(route.startTime, 'shortTime');
        };
      }
}
