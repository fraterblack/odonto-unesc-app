export interface RelatedItem {
  id: number;
  position: number;
  title: string;
}

export interface RelatedItemAction {
  type: string;
  element?: RelatedItem;
}

export enum RelatedItemActionType {
  LOADED = 'loaded',
  NEW = 'new',
  SORT_UP = 'sortUp',
  SORT_DOWN = 'sortDown',
}
