import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { GridComponent } from 'src/app/shared/common';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { Column, GridResponse, GridState } from './../grid/grid';
import { SearchRelatedItemData } from './search-related-item';

@Component({
  selector: 'app-search-related-item',
  templateUrl: './search-related-item.component.html',
  styleUrls: ['./search-related-item.component.scss']
})
export class SearchRelatedItemComponent extends GridComponent implements OnInit {

  @ViewChild('select', { static: true }) select: TemplateRef<any>;

  title: string;
  selectedItems: any[] = [];
  selectedItemsControl = {};

  private query: (params: HttpParams) => Observable<GridResponse>;
  private gridState: GridState;
  private columns: Column[] = [
    {
      name: 'title',
      header: 'Título',
      binding: 'title'
    }
  ];

  constructor(
    private dialogRef: MatDialogRef<SearchRelatedItemComponent>,
    @Inject(MAT_DIALOG_DATA) entryData: SearchRelatedItemData
  ) {
    super();

    this.title = entryData.title;
    this.query = entryData.query;
    this.columns = entryData.columns || this.columns;
  }

  ngOnInit() {
    // Grid settings
    this.grid = {
      columns: [
        {
          name: 'select',
          header: ' ',
          binding: this.select,
          headerCssClass: 'search-related-item-select-column'
        },
        ...this.columns
      ],
      paging: {
        page: 1,
        limit: 5
      },
      sorting: {
        default: {
          column: 'title',
          direction: 'asc'
        }
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

  private updateGridData(state: GridState): void {
    this.busy = true;

    const params = this.parseGridStateToHttpParams(state);

    this.query(params)
      .pipe(mapToGridResponse())
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((resp) => {
        this.busy = false;

        // Set item as selected
        if (this.selectedItems.length > 0) {
          resp.items.map(x => {
            const isSelected = this.selectedItems.find(y => y.id === x.id);
            x.checked = isSelected;

            return x;
          });
        }

        this.data.next(resp);
        this.data.asObservable();
      });
  }

  onCheckChange(event: MatCheckboxChange, item: any): void {
    const itemToDelete = this.selectedItems.find(x => x.id === item.id);

    if (event.checked && !itemToDelete) {
      this.selectedItems.push(item);
    } else {
      if (itemToDelete) {
        this.selectedItems.splice(this.selectedItems.indexOf(itemToDelete), 1);
      }
    }
  }

  onClearSelected(): void {
    this.selectedItems = [];

    this.selectedItemsControl = {};
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSelect(): void {
    this.dialogRef.close(this.selectedItems);
  }

}
