import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { GRID_PAGINATION_LIMIT, GridComponent, GridState } from './../../../../shared/components/grid/grid';

@Component({
  selector: 'app-videos-grid',
  templateUrl: './videos-grid.component.html',
  styleUrls: ['./videos-grid.component.scss']
})
export class VideosGridComponent extends GridComponent implements OnInit {

  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
/*
  constructor(private service: FakeApiService) {
    super();
  }*/

  ngOnInit() {
    // Grid settings
    this.grid = {
      columns: [
        {
          name: 'created',
          header: 'Criado',
          binding: 'created_at',
          headerCssClass: 'odonto-grid-created-at-column',
          rowCssClass: 'odonto-grid-created-at-row',
          sortId: 'created_at',
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
          binding: 'shared'
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
          column: 'created_at',
          direction: 'desc'
        },
        additional: [
          {
            column: 'created_at',
            direction: 'desc'
          },
          {
            column: 'title',
            direction: 'asc'
          }
        ]
      }
    };

    this.busy = true;

    // Load data for the first time
    // this.service.queryVideos({
    //   sort: this.grid.sorting.default.column,
    //   order: this.grid.sorting.default.direction,
    //   page: this.grid.paging.page,
    //   limit: this.grid.paging.limit
    // })
    // .pipe(
    //   take(1),
    //   takeUntil(this.ngUnsubscribe)
    // )
    // .subscribe((resp) => {
    //   this.busy = false;

    //   this.data.next(resp);
    //   this.data.asObservable();
    // });
  }

  onGridStateChange(state: GridState) {
    this.busy = true;

    // this.service.queryVideos(state)
    //   .pipe(
    //     take(1),
    //     takeUntil(this.ngUnsubscribe)
    //   )
    //   .subscribe((resp) => {
    //     this.busy = false;

    //     this.data.next(resp);
    //     this.data.asObservable();
    //   });
  }

  onAction(action: string, index: number, id: number) {
    console.log('Ação clicada: ', action);
    console.log('Index: ', index);
    console.log('ID: ', id);
  }
}
