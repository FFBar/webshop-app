import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../components/models/CartItem.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = [];

  dataSource: Cart = [];

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe(_cart => {
      this.cart = _cart;
      this.dataSource = this.cart;
    });
  }

  onGetFinalPrice(cart: Cart): number {
    return this.cartService.getFinalPrice(cart);
  }

  onGetTotal(item: CartItem): number {
    return this.cartService.getTotal(item);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(element: CartItem) {
    this.cartService.removeFromCart(element);
  }

  onAddQuantity(element: CartItem) {
    this.cartService.addQuantity(element);
  }

  onSubtractQuantity(element: CartItem) {
    this.cartService.subtractQuantity(element);
  }
}
