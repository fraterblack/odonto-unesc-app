import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

import { Video } from './../../../../core/models/Video.model';
import { AlertService } from './../../../../core/services/alert.service';
import { UploadFileService } from './../../../../core/services/upload-file.service';
import { VideoService } from './../../../../core/services/video.service';
import { FormComponent, Message } from './../../../../shared/common';
import { FormHelper } from './../../../../shared/form-helper';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent extends FormComponent implements OnInit {

  @ViewChild('fileInput', { static: true }) fileInput;

  progressUploadVideo = 0;
  isUploadVideo = false;

  private file: File = null;
  private archive: string;

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
        .subscribe((res) => {
          FormHelper.setFormGroupValues(this.formGroup, res);

          this.isUploadVideo = false;
          //TODO: Aguardar BE retornar o nome correto do vídeo.
          this.archive = res.archive;
          console.log(res);
        });
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    if (this.archive) {
      return this.save(close);
    }

    this.isUploadVideo = true;

    this.upload()
      .subscribe(res => {
        this.archive = res.message;

        this.save(close);
      },
        (error) => {
          this.isUploadVideo = false;

          this.emitErrorMessage(error);
        }
      );
  }

  private save(close?: boolean) {
    const video = new Video();
    video.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));

    video.archive = this.archive;

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

  private upload(): Observable<any> {
    if (!this.file) {

      this.emitErrorMessage('Por favor, selecione um arquivo!');
      return;
    }

    return this.uploadFileService.post(this.file)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        uploadProgress<any>(progress => {
          this.progressUploadVideo = progress;
        }),
        filterResponse<any>()
      );
  }

  onCancel() {
    this.router.navigate([`/admin/videos`]);
  }

  onClickFileInputButton(): void {
    if (!this.modelId) {
      this.fileInput.nativeElement.click();
    }
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    this.progressUploadVideo = 0;

    this.formGroup.get('archive').patchValue(this.file ? this.file.name : '');
  }
}
