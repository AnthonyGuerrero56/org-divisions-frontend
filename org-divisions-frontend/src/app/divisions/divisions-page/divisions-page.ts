import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule, NzTableQueryParams, NzTableSortOrder, NzTableFilterFn, NzTableFilterList, NzTableSortFn } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageService } from 'ng-zorro-antd/message';

import { DivisionsApiService } from '../../core/services/divisions-api.service';
import { GlobalSearchService } from '../../core/services/global-search.service';
import { DivisionRow } from '../../core/models/division.model';

@Component({
  selector: 'app-divisions-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule, NzInputModule, NzButtonModule, NzPaginationModule],
  templateUrl: './divisions-page.html',
  styleUrls: ['./divisions-page.scss']
})
export class DivisionsPage {
  private api = inject(DivisionsApiService);
  private msg = inject(NzMessageService);
  public globalSearch = inject(GlobalSearchService);

  // state
  rows = signal<DivisionRow[]>([]);
  loading = signal(false);

  // ui
  pageSize = 10;

  // checkbox selection
  checkedSet = new Set<number>();
  allChecked = false;
  indeterminate = false;

  // filters and sorting
  nameFilters: NzTableFilterList = [];
  parentFilters: NzTableFilterList = [];
  levelFilters: NzTableFilterList = [];
  
  // sorting state
  sortName: NzTableSortOrder | null = null;
  sortParentName: NzTableSortOrder | null = null;
  sortLevel: NzTableSortOrder | null = null;
  sortCollaborators: NzTableSortOrder | null = null;
  sortSubdivisions: NzTableSortOrder | null = null;
  
  // filter state
  searchName: string[] = [];
  searchParentName: string[] = [];
  searchLevel: string[] = [];

  constructor() { 
    this.reload(); 
  }

  reload() {
    this.loading.set(true);
    this.api.listAllEnriched().subscribe({
      next: data => { 
        this.rows.set(data); 
        this.loading.set(false); 
        console.log(data);
        this.updateCheckboxStates();
        this.initializeFilters(data);
        this.updateTotalCollaboratorsDisplay();
      },
      error: () => { this.msg.error('No se pudo cargar divisiones'); this.loading.set(false); }
    });
  }

  updateTotalCollaboratorsDisplay() {
    const total = this.getTotalCollaborators();
    // Update CSS custom property
    const root = document.documentElement;
    root.style.setProperty('--total-collaborators', `'Total de colaboradores: ${total}'`);
  }

  initializeFilters(data: DivisionRow[]): void {
    // Filters for Division (unique names)
    const uniqueNames = [...new Set(data.map(item => item.name))];
    this.nameFilters = uniqueNames.map(name => ({ text: name, value: name }));

    // Filters for Parent Division (unique parent names)
    const uniqueParents = [...new Set(data.map(item => item.parentName).filter(Boolean))];
    this.parentFilters = uniqueParents.map(parent => ({ text: parent!, value: parent! }));

    // Filters for Level (unique levels)
    const uniqueLevels = [...new Set(data.map(item => item.level))];
    this.levelFilters = uniqueLevels.sort((a, b) => a - b).map(level => ({ text: `Nivel ${level}`, value: level.toString() }));
  }

  // Checkbox management
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.checkedSet.add(id);
    } else {
      this.checkedSet.delete(id);
    }
    this.updateCheckboxStates();
  }

  checkAll(checked: boolean): void {
    if (checked) {
      this.rows().forEach(item => this.checkedSet.add(item.id));
    } else {
      this.checkedSet.clear();
    }
    this.updateCheckboxStates();
  }

  updateCheckboxStates(): void {
    const currentPageData = this.rows();
    const checkedCount = currentPageData.filter(item => this.checkedSet.has(item.id)).length;
    
    this.allChecked = checkedCount === currentPageData.length && currentPageData.length > 0;
    this.indeterminate = checkedCount > 0 && checkedCount < currentPageData.length;
  }

  trackByFn(index: number, item: DivisionRow): number {
    return item.id;
  }

  isChecked(id: number): boolean {
    return this.checkedSet.has(id);
  }

  // Sort functions
  sortByName = (a: DivisionRow, b: DivisionRow) => a.name.localeCompare(b.name);
  sortByParentName = (a: DivisionRow, b: DivisionRow) => (a.parentName || '').localeCompare(b.parentName || '');
  sortByLevel = (a: DivisionRow, b: DivisionRow) => a.level - b.level;
  sortByCollaborators = (a: DivisionRow, b: DivisionRow) => a.collaboratorsCount - b.collaboratorsCount;
  sortBySubdivisions = (a: DivisionRow, b: DivisionRow) => a.subdivisionCount - b.subdivisionCount;

  // Filter functions
  filterByName = (list: string[], item: DivisionRow) => list.some(name => item.name.includes(name));
  filterByParentName = (list: string[], item: DivisionRow) => list.some(parent => (item.parentName || '').includes(parent));
  filterByLevel = (list: string[], item: DivisionRow) => list.some(level => item.level.toString() === level);

  // Sorting and filtering logic
  filteredAndSortedData = computed(() => {
    let data = [...this.rows()];
    
    // Apply global search filter first
    const globalSearchTerm = this.globalSearch.searchTerm().toLowerCase();
    if (globalSearchTerm) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(globalSearchTerm) ||
        (item.parentName && item.parentName.toLowerCase().includes(globalSearchTerm)) ||
        item.collaboratorsCount.toString().includes(globalSearchTerm) ||
        item.level.toString().includes(globalSearchTerm) ||
        item.subdivisionCount.toString().includes(globalSearchTerm) ||
        (item.ambassadorFullName && item.ambassadorFullName.toLowerCase().includes(globalSearchTerm))
      );
    }
    
    // Apply column filters
    if (this.searchName.length) {
      data = data.filter(item => this.searchName.includes(item.name));
    }
    if (this.searchParentName.length) {
      data = data.filter(item => this.searchParentName.includes(item.parentName || ''));
    }
    if (this.searchLevel.length) {
      data = data.filter(item => this.searchLevel.includes(item.level.toString()));
    }
    
    // Apply sorting
    if (this.sortName) {
      data.sort((a, b) => (this.sortName === 'ascend' ? 1 : -1) * a.name.localeCompare(b.name));
    }
    if (this.sortParentName) {
      data.sort((a, b) => (this.sortParentName === 'ascend' ? 1 : -1) * (a.parentName || '').localeCompare(b.parentName || ''));
    }
    if (this.sortLevel) {
      data.sort((a, b) => (this.sortLevel === 'ascend' ? 1 : -1) * (a.level - b.level));
    }
    if (this.sortCollaborators) {
      data.sort((a, b) => (this.sortCollaborators === 'ascend' ? 1 : -1) * (a.collaboratorsCount - b.collaboratorsCount));
    }
    if (this.sortSubdivisions) {
      data.sort((a, b) => (this.sortSubdivisions === 'ascend' ? 1 : -1) * (a.subdivisionCount - b.subdivisionCount));
    }
    
    return data;
  });

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { sort, filter } = params;
    
    // Handle sorting
    const currentSort = sort.find(item => item.value !== null);
    if (currentSort) {
      // Reset all sorts
      this.sortName = null;
      this.sortParentName = null;
      this.sortLevel = null;
      this.sortCollaborators = null;
      this.sortSubdivisions = null;
      
      // Set current sort
      switch (currentSort.key) {
        case 'name':
          this.sortName = currentSort.value;
          break;
        case 'parentName':
          this.sortParentName = currentSort.value;
          break;
        case 'level':
          this.sortLevel = currentSort.value;
          break;
        case 'collaboratorsCount':
          this.sortCollaborators = currentSort.value;
          break;
        case 'subdivisionCount':
          this.sortSubdivisions = currentSort.value;
          break;
      }
    }
    
    // Handle filtering
    this.searchName = filter.find(f => f.key === 'name')?.value || [];
    this.searchParentName = filter.find(f => f.key === 'parentName')?.value || [];
    this.searchLevel = filter.find(f => f.key === 'level')?.value || [];
  }

  // Computed signal for total collaborators
  totalCollaborators = computed(() => {
    return this.rows().reduce((total, division) => total + division.collaboratorsCount, 0);
  });

  // Utility function to calculate total collaborators
  getTotalCollaborators(): number {
    return this.rows().reduce((total, division) => total + division.collaboratorsCount, 0);
  }
}
