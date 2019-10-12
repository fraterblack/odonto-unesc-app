import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VideosGridComponent } from './videos-grid/videos-grid.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoFormComponent } from './video-form/video-form.component';


@NgModule({
  declarations: [
    VideosGridComponent,
    VideoFormComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule
  ]
})
export class VideosModule { }
