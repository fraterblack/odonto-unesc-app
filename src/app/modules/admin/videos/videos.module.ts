import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VideosGridComponent } from './videos-grid/videos-grid.component';
import { VideosRoutingModule } from './videos-routing.module';


@NgModule({
  declarations: [
    VideosGridComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule
  ]
})
export class VideosModule { }
