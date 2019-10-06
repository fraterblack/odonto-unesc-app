import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavMenuComponent } from './admin-nav-menu.component';

describe('AdminNavMenuComponent', () => {
  let component: AdminNavMenuComponent;
  let fixture: ComponentFixture<AdminNavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
