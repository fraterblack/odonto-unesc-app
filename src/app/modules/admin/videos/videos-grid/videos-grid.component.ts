import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { GridComponent } from 'src/app/shared/common';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { Video } from './../../../../core/models/Video.model';
import { AlertService } from './../../../../core/services/alert.service';
import { AuthService } from './../../../../core/services/auth.service';
import { VideoService } from './../../../../core/services/video.service';
import { Message } from './../../../../shared/common';
import { GRID_PAGINATION_LIMIT, GridState } from './../../../../shared/components/grid/grid';


@Component({
  selector: 'app-videos-grid',
  templateUrl: './videos-grid.component.html',
  styleUrls: ['./videos-grid.component.scss']
})
export class VideosGridComponent extends GridComponent implements OnInit {

  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('active', { static: true }) active: TemplateRef<any>;
  @ViewChild('shared', { static: true }) shared: TemplateRef<any>;

  private gridState: GridState;

  constructor(private videoService: VideoService, private authService: AuthService, alertService: AlertService, private router: Router) {
    super(alertService);
  }

  ngOnInit() {
    // Grid settings
    this.grid = {
      columns: [
        {
          name: 'created',
          header: 'Criado',
          binding: 'createdAt',
          headerCssClass: 'odonto-grid-created-at-column',
          rowCssClass: 'odonto-grid-created-at-row',
          sortId: 'createdAt',
          sortActive: true,
          pipe: new DatePipe('en-US'),
          pipeParams: 'dd/MM/yyyy HH:mm'
        },
        {
          name: 'title',
          header: 'Título',
          binding: 'title',
          sortActive: true
        },
        {
          name: 'shared',
          header: 'Compartilhado',
          binding: this.shared,
          sortActive: true,
          sortId: 'shared'
        },
        {
          name: 'active',
          header: 'Ativo',
          binding: this.active,
          sortActive: true,
          sortId: 'active',
          headerCssClass: 'odonto-grid-check-column',
        },
        {
          name: 'actions',
          header: 'Ações',
          binding: this.actions,
          headerCssClass: 'odonto-grid-actions-column',
        }
      ],
      paging: {
        page: 1,
        limit: GRID_PAGINATION_LIMIT
      },
      sorting: {
        default: {
          column: 'title',
          direction: 'asc'
        },
        additional: [
          {
            column: 'createdAt',
            direction: 'desc'
          }
        ]
      }
    };

    // Load data for the first time
    this.gridState = this.getQueryParamsFromGrid(this.grid);
    this.updateGridData(this.gridState);
  }

  onGridStateChange(state: GridState) {
    this.gridState = state;

    this.updateGridData(state);
  }

  onAction(action: string, index: number, id: number) {
    switch (action) {
      case 'new':
        this.router.navigate([`/admin/users/create`]);
        break;
      case 'edit':
        this.router.navigate([`/admin/users/update/${id}`]);
        break;
      case 'delete':
        this.busy = true;

        this.videoService.delete(id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(
            () => {
              this.busy = false;

              this.emitSuccessMessage(Message.SUCCESSFUL_REGISTRY_DELETION);

              this.updateGridData(this.gridState);
            },
            error => this.emitErrorMessage(error)
          );
        break;
    }
  }

  isVideoSharedByMe(row: Video) {
    return (row.shared && this.authService.getUserId() === row.teacher.id);
  }

  private updateGridData(state: GridState): void {
    this.busy = true;

    const params = this.parseGridStateToHttpParams(state);

    this.videoService.query(params, 'teacher')
      .pipe(mapToGridResponse())
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((resp) => {
        this.busy = false;

        this.data.next(resp);
        this.data.asObservable();
      });
  }
}
