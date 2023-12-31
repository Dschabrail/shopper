import { Component, EventEmitter, Output } from '@angular/core';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-header',
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
    CommonModule
  ],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.scss',
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort: string = 'desc';
  itemsShowCount: number = 12;
  dNone: boolean = false;

  ngOnInit(){
    this.checkWindoWidth();
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdate(count: number): void {
    this.itemsShowCount = count;
    this.itemsChange.emit(count);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  checkWindoWidth(){
    if (window.innerWidth <= 800) {
      this.dNone = true;
      this.onColumnsUpdated(1);
    }
  }
}
