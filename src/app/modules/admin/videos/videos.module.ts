import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { VideoFormComponent } from './video-form/video-form.component';
import { VideosGridComponent } from './videos-grid/videos-grid.component';
import { VideosRoutingModule } from './videos-routing.module';

@NgModule({
  declarations: [
    VideosGridComponent,
    VideoFormComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class VideosModule { }
