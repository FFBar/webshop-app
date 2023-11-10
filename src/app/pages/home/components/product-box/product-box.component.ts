import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../components/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCartEvent = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCartEvent.emit(this.product);
  }
}
