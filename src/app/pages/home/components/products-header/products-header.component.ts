import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();

  sort = 'asc';
  itemsShowCount = 12;

  onSortUpdated(selectedSort: string): void {
    this.sort = selectedSort;
  }

  onItemsUpdated(selectedItems: number) {
    this.itemsShowCount = selectedItems;
  }

  onColumnsUpdated(columnCount: number): void {
    this.columnsCountChange.emit(columnCount);
  }
}
