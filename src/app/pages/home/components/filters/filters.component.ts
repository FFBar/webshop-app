import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  @Output() showCategoryEvent = new EventEmitter<string>();
  categories = ['shoes', 'sports'];

  onShowCategory(category: string) {
    this.showCategoryEvent.emit(category);
  }
}
