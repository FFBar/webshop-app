import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Output() showCategoryEvent = new EventEmitter<string>();
  categories$: Observable<string[]> | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categories$ = this.storeService.getAllCategories();
  }

  onShowCategory(category: string) {
    this.showCategoryEvent.emit(category);
  }
}
