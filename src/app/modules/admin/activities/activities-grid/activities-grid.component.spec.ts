import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesGridComponent } from './activities-grid.component';

describe('ActivitiesGridComponent', () => {
  let component: ActivitiesGridComponent;
  let fixture: ComponentFixture<ActivitiesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
