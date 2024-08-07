export interface INote {
  id: string;
  title: string;
  description: string;
  date: string;
}
export enum SortName {
  new = 'new',
  old = 'old',
}
