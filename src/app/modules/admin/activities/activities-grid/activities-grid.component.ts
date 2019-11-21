import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { GridComponent } from 'src/app/shared/common';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { ActivityService } from './../../../../core/services/activity.service';
import { AlertService } from './../../../../core/services/alert.service';
import { Message } from './../../../../shared/common';
import { GRID_PAGINATION_LIMIT, GridState } from './../../../../shared/components/grid/grid';

@Component({
  selector: 'app-activities-grid',
  templateUrl: './activities-grid.component.html',
  styleUrls: ['./activities-grid.component.scss']
})
export class ActivitiesGridComponent extends GridComponent implements OnInit {

  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('active', { static: true }) active: TemplateRef<any>;
  @ViewChild('shared', { static: true }) shared: TemplateRef<any>;

  private gridState: GridState;

  constructor(private activityService: ActivityService, alertService: AlertService, private router: Router) {
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
          name: 'code',
          header: 'Código',
          binding: 'code',
          sortActive: true
        },
        {
          name: 'dateStart',
          header: 'Data Início',
          binding: 'dateStart',
          headerCssClass: 'odonto-grid-created-at-column',
          rowCssClass: 'odonto-grid-created-at-row',
          sortId: 'dateStart',
          sortActive: true,
          pipe: new DatePipe('en-US'),
          pipeParams: 'dd/MM/yyyy HH:mm'
        },
        {
          name: 'dateEnd',
          header: 'Data Fim',
          binding: 'dateEnd',
          headerCssClass: 'odonto-grid-created-at-column',
          rowCssClass: 'odonto-grid-created-at-row',
          sortId: 'dateEnd',
          sortActive: true,
          pipe: new DatePipe('en-US'),
          pipeParams: 'dd/MM/yyyy HH:mm'
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
        this.router.navigate([`/admin/activities/create`]);
        break;
      case 'edit':
        this.router.navigate([`/admin/activities/update/${id}`]);
        break;
      case 'delete':
        this.busy = true;

        this.activityService.delete(id)
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

  private updateGridData(state: GridState): void {
    this.busy = true;

    const params = this.parseGridStateToHttpParams(state);

    this.activityService.query(params, 'teacher')
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
