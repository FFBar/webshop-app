import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
})
export class ProductsHeaderComponent {
  @Output() colChangeEvent = new EventEmitter<number>();
  @Output() sortChangeEvent = new EventEmitter<string>();
  @Output() itemsChangeEvent = new EventEmitter<number>();

  sort = 'asc';
  itemsShowCount = 12;

  onSortUpdate(selectedSort: string): void {
    this.sort = selectedSort;
    this.sortChangeEvent.emit(selectedSort);
  }

  onItemsCountUpdate(selectedItems: number) {
    this.itemsShowCount = selectedItems;
    this.itemsChangeEvent.emit(selectedItems);
  }

  onColumnsUpdated(columnCount: number): void {
    this.colChangeEvent.emit(columnCount);
  }
}
