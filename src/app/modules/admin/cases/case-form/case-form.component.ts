import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Video } from 'src/app/core/models/Video.model';
import { VideoCase } from 'src/app/core/models/VideoCase.model';

import { Case } from './../../../../core/models/Case.model';
import { AlertService } from './../../../../core/services/alert.service';
import { CaseService } from './../../../../core/services/case.service';
import { VideoService } from './../../../../core/services/video.service';
import { FormComponent, Message } from './../../../../shared/common';
import {
  RelatedItem,
  RelatedItemAction,
  RelatedItemActionType,
} from './../../../../shared/components/related-items-selector/related-item-selector';
import {
  SearchRelatedItemComponent,
} from './../../../../shared/components/search-related-item/search-related-item.component';
import { FormHelper } from './../../../../shared/form-helper';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})
export class CaseFormComponent extends FormComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    shared: new FormControl(false),
    videos: new FormControl([]),
    active: new FormControl(true)
  });

  modelId: number;

  dataSource: RelatedItem[] = [];
  relatedData: Subject<RelatedItem[]> = new Subject<RelatedItem[]>();

  constructor(
    alertService: AlertService,
    private videoService: VideoService,
    private caseService: CaseService,
    private router: Router,
    private dialog: MatDialog,
    route: ActivatedRoute
  ) {
    super(alertService);

    this.modelId = route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.modelId) {
      this.caseService.get(this.modelId, new HttpParams(), 'video')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(res => {
          FormHelper.setFormGroupValues(this.formGroup, res, ['videos']);

          res.videos
            .sort((a, b) => {
              if (a.position < b.position) {
                return -1;
              }
              if (a.position > b.position) {
                return 1;
              }

              return 0;
            })
            .forEach(x => {
              this.dataSource.push(x.video);
            });

          this.relatedData.next(this.dataSource);
          this.relatedData.asObservable();
        }
        );
    }
  }

  onAction(action: RelatedItemAction) {
    switch (action.type) {
      // When notified by the component that is done to populate
      case RelatedItemActionType.LOADED:
        this.relatedData.next(this.dataSource);
        this.relatedData.asObservable();
        break;
      case RelatedItemActionType.NEW:
        return this.dialog.open(SearchRelatedItemComponent, {
          width: '700px',
          data: {
            title: 'Selecionar Vídeos',
            query: this.queryVideos.bind(this),
            columns: [
              {
                name: 'title',
                header: 'Título',
                binding: 'title'
              }
            ]
          }
        }).afterClosed()
          .subscribe((result) => {
            if (result) {
              // Iterate over each selected item to put in the list
              result.forEach(x => {
                const alreadyExists = this.dataSource.find(y => y.id === x.id);

                if (!alreadyExists) {
                  this.dataSource.push(x);
                }
              });

              this.relatedData.next(this.dataSource);
              this.relatedData.asObservable();
            }
          });
        break;
      case RelatedItemActionType.SORT_UP:
        const indexItemUp = this.dataSource.findIndex((item) => item.id === action.element.id);
        this.dataSource.splice((indexItemUp - 1), 0, this.dataSource.splice(indexItemUp, 1)[0]);
        break;
      case RelatedItemActionType.SORT_DOWN:
        const indexItemDown = this.dataSource.findIndex((item) => item.id === action.element.id);
        this.dataSource.splice((indexItemDown + 1), 0, this.dataSource.splice(indexItemDown, 1)[0]);
        break;
      case RelatedItemActionType.DELETE:
        this.dataSource.splice(this.dataSource.findIndex((item) => item.id === action.element.id), 1);
        break;
      case RelatedItemActionType.VIEW:
        // TODO
        // this.dataSource.push({ id: 5, position: 5, title: 'VIEW' });
        break;
    }

    // When notified by the component that is done to populate6
    this.relatedData.next(this.dataSource);
    this.relatedData.asObservable();
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const casee = new Case();
    casee.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));
    // Reset for edit without closing the form

    this.dataSource.forEach((x, i) => {
      const obj = new VideoCase();
      const video = new Video();
      video.id = x.id;

      obj.position = i++;
      obj.video = video;

      casee.videos.push(obj);
    });

    let action$: Observable<any>;

    if (this.modelId) {
      action$ = this.caseService.put(this.modelId, casee);
    } else {
      action$ = this.caseService.post(casee);
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
            this.router.navigate([`/admin/cases`]);

            // When save only
          } else {
            // When is a new registry, redirect to update
            if (!this.modelId) {
              this.router.navigate([`/admin/cases/update/${res.id}`]);
            }
          }
        },
        error => this.emitErrorMessage(error)
      );
  }

  queryVideos(params: HttpParams) {
    return this.videoService.query(params);
  }

  onCancel() {
    this.router.navigate([`/admin/cases`]);
  }
}
