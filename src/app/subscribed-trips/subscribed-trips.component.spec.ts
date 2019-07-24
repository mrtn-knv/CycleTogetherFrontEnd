import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedTripsComponent } from './subscribed-trips.component';

describe('SubscribedTripsComponent', () => {
  let component: SubscribedTripsComponent;
  let fixture: ComponentFixture<SubscribedTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribedTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
