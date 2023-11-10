import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../components/models/CartItem.model';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

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

  constructor(
    private cartService: CartService,
    private http: HttpClient
  ) {}

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

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(element: CartItem): void {
    this.cartService.removeFromCart(element);
  }

  onAddQuantity(element: CartItem): void {
    this.cartService.addQuantity(element);
  }

  onSubtractQuantity(element: CartItem): void {
    this.cartService.subtractQuantity(element);
  }

  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart,
      })
      .subscribe(async (res: any) => {
        const stripe = await loadStripe(
          'pk_test_51OB1H1H2MS9dC3lUalgv81gk83dikQtm1dVXXioHjEo5mAg54nmkZk1kgV0WdrTQ3xAuHNtCTts5XfoufJwPYdAf00rvnQn3YC'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
