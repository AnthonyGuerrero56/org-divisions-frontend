import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  // Signal que mantiene el término de búsqueda global
  searchTerm = signal<string>('');

  // Método para actualizar el término de búsqueda
  updateSearchTerm(term: string): void {
    this.searchTerm.set(term.trim());
  }

  // Método para limpiar la búsqueda
  clearSearch(): void {
    this.searchTerm.set('');
  }
}
