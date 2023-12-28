import { Component } from '@angular/core';
import { Cart } from '../../components/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart: Cart = { items: []};

}
