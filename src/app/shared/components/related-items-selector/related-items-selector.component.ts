import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { RelatedItem, RelatedItemAction } from './related-item-selector';

@Component({
  selector: 'app-related-items-selector',
  templateUrl: './related-items-selector.component.html',
  styleUrls: ['./related-items-selector.component.scss']
})
export class RelatedItemsSelectorComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  @Input() actions: TemplateRef<any>;
  // tslint:disable-next-line: no-input-rename
  @Input('data') data$: Observable<RelatedItem[]>;
  @Input() newItemLabel: string;

  @Output() action = new EventEmitter<RelatedItemAction>();

  dataSource: RelatedItem[] = [];
  displayedColumns: string[];
  dataChangeSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.displayedColumns = [ 'position', 'title', 'actions' ];

    this.dataChangeSubscription = this.data$.subscribe(this.onDataChange.bind(this));

    // Inform subscribe that component is done to populate
    this.action.emit({ type: 'loaded' });

    this.cdr.detectChanges();
  }

  onDataChange(data: RelatedItem[]) {
    this.dataSource = data;

    this.table.renderRows();
  }

  onActionClicked(type: string, element?: RelatedItem) {
    this.action.emit({ type, element });
  }

  setCountClass(dataSource: RelatedItem[]): string {
    return !dataSource || dataSource.length === 0 ? 'empty-items' : (dataSource.length === 1 ? 'single-item' : '');
  }

  ngOnDestroy() {
    this.dataChangeSubscription.unsubscribe();
  }
}
