import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Division } from '../models/division.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DivisionsApiService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  listAll(): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.base}/divisions`);
  }

  listSubdivisions(id: number): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.base}/divisions/${id}/subdivisions`);
  }

  create(payload: Partial<Division>) {
    return this.http.post<Division>(`${this.base}/divisions`, payload);
  }

  update(id: number, payload: Partial<Division>) {
    return this.http.patch<Division>(`${this.base}/divisions/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/divisions/${id}`);
  }

  /** Enriched List: calculates parentName and subdivisionCount on the client */
  listAllEnriched() {
    return this.listAll().pipe(
      switchMap(divs => {
        if (!divs.length) return of([]);
        const byId = new Map(divs.map(d => [d.id, d]));
        const counts: Record<number, number> = {};
        for (const d of divs) if (d.parentId) counts[d.parentId] = (counts[d.parentId] ?? 0) + 1;
        const rows = divs.map(d => ({
          ...d,
          parentName: d.parentId ? byId.get(d.parentId)?.name ?? null : null,
          subdivisionCount: counts[d.id] ?? 0
        }));
        return of(rows);
      })
    );
  }
}
