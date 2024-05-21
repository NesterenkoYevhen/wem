export interface Email {
  id?: number;
  type?: string;
  from: string;
  to?: string;
  cc?: string;
  subject?: string;
  msg?: string;
  date?: Date;
  isRead?: boolean;
}
