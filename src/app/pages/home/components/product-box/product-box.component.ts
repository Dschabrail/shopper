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
import { GlobalVariableService } from '../../../../services/global-variable.service';

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

  constructor(public variableService: GlobalVariableService) {
    window.addEventListener('resize', this.handleWindowResize);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.checkWindowWidth();
    }, 0);
  }

  handleWindowResize = () => {
    this.checkWindowWidth();
  };

  checkWindowWidth() {
    if (window.innerWidth <= 620) {
      this.variableService.productBoxResponsiv = true;
    } else {
      this.variableService.productBoxResponsiv = false;
    }
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
