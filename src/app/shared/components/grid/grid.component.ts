import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Grid, GridPaginatorIntl, GridResponse, GridState } from './grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useClass: GridPaginatorIntl }
  ]
})
export class GridComponent implements AfterViewInit, AfterContentInit, OnDestroy {

  @Input() grid: Grid;
  // tslint:disable-next-line: no-input-rename
  @Input('data') data$: Observable<GridResponse>;
  @Input() busy: boolean;

  @Output() stateChange: EventEmitter<GridState> = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  items: any[] = [];
  totalResults = 0;
  displayedColumns: string[];
  searchSentence: string;

  dataChangeSubscription: Subscription;
  sortChangeSubscription: Subscription;
  filterChangeSubscription: Subscription;
  stateChangeSubscription: Subscription;
  filterKeyUp = new Subject<any>();

  ngAfterContentInit() {
    // All sortable grid columns that contains templateRef binding elements, must set sortId
    this.grid.columns.forEach((item) => {
      if (item.sortActive && !item.sortId && this.isTemplateRefBinding(item.binding)) {
        throw new Error(
          `For sortable "${item.name}" column with templateRef binding, you need set sortId parameter.`
        );
      }
    });

    // Set displayed columns from grid column names
    this.displayedColumns = this.grid.columns.map((item) => item.name);

    this.dataChangeSubscription = this.data$.subscribe(this.onDataChange.bind(this));
  }

  ngAfterViewInit() {
    const filterObservable = this.filterKeyUp.pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    );

    // If the user changes the sort order or filter, reset back to the first page.
    this.sortChangeSubscription = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.filterChangeSubscription = this.filterKeyUp.subscribe(() => this.paginator.pageIndex = 0);

    // On sort, paginator or filter change
    this.stateChangeSubscription = merge(this.sort.sortChange, this.paginator.page, filterObservable)
      .subscribe(this.onStateChange.bind(this));
  }

  /**
   * Handle data returned by data Observable
   *
   * @param data Grid data
   */
  onDataChange(data: GridResponse) {
    this.totalResults = data.total;

    this.items = data.items;
  }

  /**
   * Prepare param and fires stateChange EventEmitter
   */
  onStateChange() {
    let sort = this.sort.active;
    let order: string = this.sort.direction;

    // Additional sorting parameters
    if (this.grid.sorting.additional) {
      const additional = this.grid.sorting.additional
        .filter((item) => item.column !== this.sort.active);

      if (additional.length) {
        sort += `,${additional.map((item) => item.column).join(',')}`;
        order += `,${additional.map((item) => item.direction).join(',')}`;
      }
    }

    const state: GridState = {
      sort,
      order,
      page: this.paginator.pageIndex + 1,
      limit: this.grid.paging.limit,
      search: this.searchSentence,
    };

    this.stateChange.emit(state);
  }

  clearFilter(event: any) {
    this.searchSentence = '';
    this.filterKeyUp.next(event);
  }

  isTemplateRefBinding(binding: any) {
    return binding instanceof TemplateRef;
  }

  ngOnDestroy() {
    this.dataChangeSubscription.unsubscribe();
    this.sortChangeSubscription.unsubscribe();
    this.filterChangeSubscription.unsubscribe();
    this.stateChangeSubscription.unsubscribe();
  }
}
