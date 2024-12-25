// devise.model.ts
export interface Devise {
  id?: string;
  base: string;
  cible: string;
  montantBase: number;
  montantConverti: number;
  date: Date | string;  
}
