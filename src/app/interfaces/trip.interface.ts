export interface Trip {
  id?: number;
  destination: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  budget: number;
  notes?: string;
}
