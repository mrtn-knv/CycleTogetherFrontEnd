import { Injectable } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Subject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class SharedService {
    searchInputChanged = new EventEmitter();
}
