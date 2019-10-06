import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLayoutComponent } from './activity-layout.component';

describe('ActivityLayoutComponent', () => {
  let component: ActivityLayoutComponent;
  let fixture: ComponentFixture<ActivityLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
