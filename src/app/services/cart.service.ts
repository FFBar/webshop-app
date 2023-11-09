import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../components/models/CartItem.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject(RxJs): Requires an initial value and emits the current value to new subscribers
  // Once the initial value is emitted, all subsequent values are emitted to the subscribers
  // add new item to cart: get the current value of the BehaviorSubject, add the new item to the array, emit the new value
  cart = new BehaviorSubject<Cart>([]);
  constructor(private _snackBar: MatSnackBar) {}
  addToCart(item: CartItem): void {
    const items = [...this.cart.value];
    const itemInCart = items.find(currentItem => currentItem.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    // emit the new value
    this.cart.next(items);

    this._snackBar.open('1 Item added to cart', 'Close', {
      duration: 2000,
    });
    console.log(this.cart.value);
  }
  getTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getFinalPrice(cart: Cart): number {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cart.next([]);
    this._snackBar.open('Cart cleared', 'Close', { duration: 3000 });
  }
}
