import { Component } from '@angular/core';
import { Cart, CartItem } from '../../components/models/cart.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CurrencyPipe,
    MatIconModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  cartResponsiv: boolean = false;

  constructor(public cartService: CartService, private http: HttpClient) {
    window.addEventListener('resize', this.handleWindowResize);
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
    setTimeout(() => {
      this.checkWindowWidth();
    }, 0);
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onCheckout(): void {
    this.http
      .post('https://shopper.dschabrail-isaev.at:3001/checkout', {
        items: this.cart.items,
      })
      .pipe(
        catchError((error) => {
          console.error('HTTP error during checkout:', error);
          throw error; // Rethrow the error to propagate it further
        })
      )
      .subscribe(async (res: any) => {
        try {
          let stripe = await loadStripe(
            'pk_test_51OT8QiJbIN7bJt7js2HO7EATWW9BMWFQ53iGoIfpAD9XxICZzQkC1xo9g1quYWtvVQeaZV6Ij4vW4RftMWWIbhCq00pTM3pzco'
          );
          stripe?.redirectToCheckout({
            sessionId: res.id,
          });
        } catch (error) {
          console.error('Stripe error during checkout:', error);
        }
      });
  }

  handleWindowResize = () => {
    this.checkWindowWidth();
  };

  checkWindowWidth() {
    if (window.innerWidth <= 1090) {
      this.cartResponsiv = true;
    } else {
      this.cartResponsiv = false;
    }
  }
}
