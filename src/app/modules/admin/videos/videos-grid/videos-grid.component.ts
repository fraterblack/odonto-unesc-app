import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { Grid, GridResponse, GridState } from './../../../../shared/components/grid/grid';
import { FakeApiService } from './../../../../shared/services/fake-api.service';

@Component({
  selector: 'app-videos-grid',
  templateUrl: './videos-grid.component.html',
  styleUrls: ['./videos-grid.component.scss']
})
export class VideosGridComponent implements OnInit {

  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;

  constructor(private service: FakeApiService) {}

  busy = false;

  // Grid settings
  grid: Grid;

  // Grid data
  data: Subject<GridResponse> = new Subject();

  ngOnInit() {
    this.busy = true;

    // Grid settings
    this.grid = {
      columns: [
        {
          name: 'created',
          header: 'Criado',
          binding: 'created_at',
          headerCssClass: 'odonto-grid-created-at-column',
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
        limit: 3
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

    // Load data for the first time
    this.service.queryVideos(
      this.grid.sorting.default.column,
      this.grid.sorting.default.direction,
      this.grid.paging.page,
      this.grid.paging.limit
    ).subscribe((resp) => {
      this.busy = false;

      this.data.next(resp);
      this.data.asObservable();
    });
  }

  /**
   * Get data from new grid state
   *
   * @param state Grid state
   */
  onGridStateChange(state: GridState) {
    this.busy = true;

    this.service.queryVideos(
      state.sort,
      state.order,
      state.page,
      state.limit,
      state.search
    ).subscribe((resp) => {
      this.busy = false;

      this.data.next(resp);
      this.data.asObservable();
    });
  }

  onActionClicked(action: string, index: number, id: number) {
    console.log('Ação clicada: ', action);
    console.log('Index: ', index);
    console.log('ID: ', id);
  }
}
