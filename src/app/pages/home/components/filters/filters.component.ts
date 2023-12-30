import { Component, EventEmitter, Output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { StoreService } from '../../../../services/store.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatExpansionModule, MatListModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();

  categories = [];

  constructor( private storeService: StoreService) {}

ngOnInit(): void {
  this.storeService.getAllCategoris();
}

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
