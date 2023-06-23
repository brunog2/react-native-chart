export interface TableDataInterface {
  id: number;
  name: string;
  age: number;
  status?: 'unchecked' | 'checked' | 'indeterminate';
}
export const tableData: TableDataInterface[] = [
  {id: 1, name: 'Jan', age: 19, status: 'checked'},
  {id: 2, name: 'Dan', age: 17, status: 'checked'},
  {id: 3, name: 'Jack', age: 16, status: 'unchecked'},
  {id: 4, name: 'Sam', age: 35, status: 'unchecked'},
  {id: 5, name: 'Joe', age: 42, status: 'unchecked'},
  {id: 6, name: 'Roger', age: 25, status: 'checked'},
  {id: 7, name: 'Roger', age: 25, status: 'checked'},
  {id: 8, name: 'Joe', age: 42, status: 'unchecked'},
  {id: 9, name: 'Sam', age: 35, status: 'unchecked'},
  {id: 10, name: 'Jack', age: 16, status: 'unchecked'},
  {id: 11, name: 'Dan', age: 17, status: 'checked'},
  {id: 12, name: 'Jan', age: 19, status: 'checked'},
  {id: 13, name: 'Jan', age: 19, status: 'checked'},
  {id: 14, name: 'Jan', age: 19, status: 'checked'},
  {id: 15, name: 'Jan', age: 19, status: 'checked'},
  {id: 16, name: 'Jan', age: 19, status: 'checked'},
  {id: 17, name: 'Jan', age: 19, status: 'checked'},
  {id: 18, name: 'Jan', age: 19, status: 'checked'},
  {id: 19, name: 'Jan', age: 19, status: 'checked'},
  {id: 20, name: 'Jan', age: 19, status: 'checked'},
  {id: 21, name: 'Jan', age: 19, status: 'checked'},
  {id: 22, name: 'Jan', age: 19, status: 'checked'},
  {id: 23, name: 'Jan', age: 19, status: 'checked'},
];
