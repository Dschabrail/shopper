import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { Product } from '../../../../components/models/product.model';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCardModule,
    CurrencyPipe,
    CommonModule,
  ],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss',
})
export class ProductBoxComponent {
@Input() fullWidthMode = false;
@Input() product: Product | undefined;
@Output() addToCart = new EventEmitter();

onAddToCart(): void {
this.addToCart.emit(this.product);
}
}
