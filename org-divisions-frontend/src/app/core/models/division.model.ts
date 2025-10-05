export interface Division {
  id: number;
  name: string;
  parentId: number | null;
  ambassadorFullName: string | null;
  level: number;
  collaboratorsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DivisionRow extends Division {
  parentName?: string | null;
  subdivisionCount: number;
}