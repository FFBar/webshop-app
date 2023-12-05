import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../components/models/product.model';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';

// TODO: Refactor output to async pipe

// type: object with a key of type number and a value of type number
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Product[] | undefined = [];
  sort = 'asc';
  limit = '12';
  productSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
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
    this.productSubscription = this.storeService
      .getAllProducts(this.limit, this.sort, this.category)
      .subscribe((_products: Product[]) => {
        this.products = _products;
      });
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
