import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DivisionsPage } from '../divisions-page/divisions-page';
import { GlobalSearchService } from '../../core/services/global-search.service';

@Component({
  selector: 'app-fixed-page',
  standalone: true,
  imports: [CommonModule, DivisionsPage, FormsModule, NzInputModule, NzIconModule, NzTabsModule, NzButtonModule, NzSelectModule],
  templateUrl: './fixed-page.html',
  styleUrl: './fixed-page.scss'
})
export class FixedPage {
  private globalSearch = inject(GlobalSearchService);
  
  searchValue = '';

  // Method to handle search input changes
  onSearchChange(value: string): void {
    this.searchValue = value;
    this.globalSearch.updateSearchTerm(value);
  }

  // Method to clear the search input
  clearSearch(): void {
    this.searchValue = '';
    this.globalSearch.clearSearch();
  }
}
