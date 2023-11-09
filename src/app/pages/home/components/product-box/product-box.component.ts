import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../components/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCartEvent = new EventEmitter<Product>();

  product: Product | undefined = {
    id: 1,
    title: 'Snickers',
    price: 150,
    category: 'Candy',
    description: 'Snickers description',
    image: 'https://via.placeholder.com/150',
  };

  onAddToCart() {
    this.addToCartEvent.emit(this.product);
  }
}
