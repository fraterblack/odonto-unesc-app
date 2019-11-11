import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';

import { VideoService } from './../../../../core/services/video.service';
import { GRID_PAGINATION_LIMIT, GridComponent, GridState } from './../../../../shared/components/grid/grid';

@Component({
  selector: 'app-videos-grid',
  templateUrl: './videos-grid.component.html',
  styleUrls: ['./videos-grid.component.scss']
})
export class VideosGridComponent extends GridComponent implements OnInit {

  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('active', { static: true }) active: TemplateRef<any>;

  constructor(private videoService: VideoService, private router: Router) {
    super();
  }

  ngOnInit() {
    // Grid settings
    this.grid = {
      columns: [
        {
          name: 'title',
          header: 'Título',
          binding: 'title',
          sortActive: true
        },
        {
          name: 'active',
          header: 'Ativo',
          binding: this.active,
          sortActive: true
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
            column: 'title',
            direction: 'asc'
          }
        ]
      }
    };

    this.busy = true;

    // Load data for the first time
    this.videoService.query({
      sort: this.grid.sorting.default.column,
      order: this.grid.sorting.default.direction,
      page: this.grid.paging.page,
      limit: this.grid.paging.limit
    })
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

  onGridStateChange(state: GridState) {
    this.busy = true;

    this.videoService.query(state)
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

  onAction(action: string, index: number, id: number) {
    switch (action) {
      case 'new':
        this.router.navigate([`/admin/videos/create`]);
        break;
      case 'edit':
        this.router.navigate([`/admin/videos/update/${id}`]);
        break;
    }
  }
}
