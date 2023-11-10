import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategoryEvent = new EventEmitter<string>();
  categories: string[] | undefined;
  categorySubscription: Subscription | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categorySubscription = this.storeService
      .getAllCategories()
      .subscribe(_categories => {
        this.categories = _categories;
      });
  }
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
  onShowCategory(category: string) {
    this.showCategoryEvent.emit(category);
  }
}
