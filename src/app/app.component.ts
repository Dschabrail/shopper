import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Cart } from './components/models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-header [cart]="cart" class="flex justify-center"></app-header
    ><router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
})
export class AppComponent {
  cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
