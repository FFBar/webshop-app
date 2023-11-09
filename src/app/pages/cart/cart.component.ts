import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../components/models/CartItem.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = [
    {
      product: 'https://via.placeholder.com/150',
      name: 'Snickers',
      price: 150,
      quantity: 2,
      id: 1,
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'Mars',
      price: 1.56,
      quantity: 5,
      id: 2,
    },
  ];
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
    this.dataSource = this.cart;
  }

  getFinalPrice(cart: Cart): number {
    return this.cartService.getFinalPrice(cart);
  }

  getTotal(item: CartItem): number {
    return this.cartService.getTotal(item);
  }
}
