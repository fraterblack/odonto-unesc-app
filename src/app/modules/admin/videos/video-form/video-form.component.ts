import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Video } from 'src/app/core/models/Video.model';
import { Form } from 'src/app/shared/common';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

import { AlertService } from './../../../../core/services/alert.service';
import { UploadFileService } from './../../../../core/services/upload-file.service';
import { VideoService } from './../../../../core/services/video.service';
import { Message } from './../../../../shared/common';
import { FormHelper } from './../../../../shared/form-helper';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent extends Form implements OnInit {

  @ViewChild('fileInput', { static: true }) fileInput;

  file: File | null = null;
  hashVideo: string;
  progress = 0;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    archive: new FormControl(),
    shared: new FormControl(false),
    active: new FormControl(true)
  });

  modelId: number;

  constructor(
    alertService: AlertService,
    private videoService: VideoService,
    private uploadFileService: UploadFileService,
    private router: Router, route: ActivatedRoute
  ) {
    super(alertService);

    this.modelId = route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.modelId) {
      this.videoService.get(this.modelId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => FormHelper.setFormGroupValues(this.formGroup, res));
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const video = new Video();

    this.onUpload();

    video.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));

    video.archive = this.hashVideo;

    let action$: Observable<any>;

    if (this.modelId) {
      action$ = this.videoService.put(this.modelId, video);
    } else {
      action$ = this.videoService.post(video);
    }

    action$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {

          this.emitSuccessMessage(
            this.modelId
              ? Message.SUCCESSFUL_REGISTRY_EDITION
              : Message.SUCCESSFUL_REGISTRY_INSERTION);

          // When save & close
          if (close) {
            this.router.navigate([`/admin/videos`]);

            // When save only
          } else {
            // When is a new registry, redirect to update
            if (!this.modelId) {
              this.router.navigate([`/admin/videos/update/${res.id}`]);
            }
          }
        },
        error => this.emitErrorMessage(error)
      );
  }

  async onUpload() {
    let actionUpload$: Observable<any>;

    if (this.file) {
      actionUpload$ = this.uploadFileService.post(this.file);
    }

    await actionUpload$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        uploadProgress(progress => {
          console.log(progress)
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe(res => console.log(res, 'Upload Concluído')
      );
  }

  onCancel() {
    this.router.navigate([`/admin/videos`]);
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    this.progress = 0;
  }
}
