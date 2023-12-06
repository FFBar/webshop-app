import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../../components/models/product.model';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { StoreService } from '../../services/store.service';

// type: object with a key of type number and a value of type number
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products$: Observable<Product[]> | undefined;
  sort = 'asc';
  limit = '12';

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  onColumnsUpdated(columnsCount: number): void {
    this.cols = columnsCount;
    // assign the value of the object with the key of the number of columns to the rowHeight variable
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(updatedCategory: string): void {
    if (updatedCategory === 'All') updatedCategory = '';
    this.category = updatedCategory;
    this.getAllProducts();
  }

  // Watch out: different type alias! (Product vs. CartItem)
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  private getAllProducts(): void {
    this.products$ = this.storeService.getAllProducts(
      this.limit,
      this.sort,
      this.category
    );
  }

  onSortUpdate(_sort: string) {
    this.sort = _sort;
    this.getAllProducts();
  }

  onItemsCountUpdate(_limit: number) {
    this.limit = _limit.toString();
    this.getAllProducts();
  }
}
