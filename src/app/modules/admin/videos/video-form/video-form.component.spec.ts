import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFormComponent } from './video-form.component';

describe('VideoFormComponent', () => {
  let component: VideoFormComponent;
  let fixture: ComponentFixture<VideoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
