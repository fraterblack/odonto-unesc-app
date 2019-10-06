import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMessageLayoutComponent } from './featured-message-layout.component';

describe('FeaturedMessageLayoutComponent', () => {
  let component: FeaturedMessageLayoutComponent;
  let fixture: ComponentFixture<FeaturedMessageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedMessageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedMessageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
