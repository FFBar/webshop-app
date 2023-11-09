import { Component } from '@angular/core';
import { Product } from '../../components/models/product.model';
import { CartService } from '../../services/cart.service';

// type: object with a key of type number and a value of type number
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;

  constructor(private cartService: CartService) {}

  onColumnsUpdated(columnsCount: number): void {
    this.cols = columnsCount;
    // assign the value of the object with the key of the number of columns to the rowHeight variable
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(updatedCategory: string): void {
    this.category = updatedCategory;
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
}
