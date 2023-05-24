export interface TableDataInterface {
  id: number;
  name: string;
  age: number;
  hasCar: boolean;
  checked?: boolean;
}
export const tableData: TableDataInterface[] = [
  {id: 1, name: 'Jan', age: 19, hasCar: true},
  {id: 2, name: 'Dan', age: 17, hasCar: true},
  {id: 3, name: 'Jack', age: 16, hasCar: false},
  {id: 4, name: 'Sam', age: 35, hasCar: false},
  {id: 5, name: 'Joe', age: 42, hasCar: false},
  {id: 6, name: 'Roger', age: 25, hasCar: true},
];
