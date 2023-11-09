import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/CartItem.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: Cart = [];
  itemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // q: Should i subscribe to the cartService in the header component or get the data via @Input-property?

    this.cartService.cart.subscribe(cart => {
      this.items = cart;
      this.itemCount = cart.length;
    });
  }
  getTotal(item: CartItem): number {
    return this.cartService.getTotal(item);
  }
  getFinalPrice(cart: Cart): number {
    return this.cartService.getFinalPrice(cart);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
