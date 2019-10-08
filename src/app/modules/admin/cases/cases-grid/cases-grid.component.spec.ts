import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesGridComponent } from './cases-grid.component';

describe('CasesGridComponent', () => {
  let component: CasesGridComponent;
  let fixture: ComponentFixture<CasesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
