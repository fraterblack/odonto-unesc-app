import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptsGridComponent } from './scripts-grid.component';

describe('ScriptsGridComponent', () => {
  let component: ScriptsGridComponent;
  let fixture: ComponentFixture<ScriptsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
