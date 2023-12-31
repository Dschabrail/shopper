import { Component, EventEmitter, Output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';
import { GlobalVariableService } from '../../../../services/global-variable.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatExpansionModule, MatListModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string | undefined>();
  categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(
    private storeService: StoreService,
    public variableService: GlobalVariableService
  ) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response: Array<string>) => {
        this.categories = response;
      });
  }

  onShowCategory(category: string | undefined): void {
    if(window.innerWidth <= 1200){
      this.showCategory.next(category);
      this.variableService.sideNaveOpen = false;
    } else {
    this.showCategory.next(category);
    }
  }

  getAllProducts(): void {
    this.storeService.getAllProducts('12', 'desc', undefined);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
