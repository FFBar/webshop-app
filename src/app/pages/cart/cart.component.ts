import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../components/models/CartItem.model';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';

// TODO: implement the logic for saving the cart in session storage
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
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

  cartSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe(_cart => {
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
          'Replace with your stripe test public key'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
