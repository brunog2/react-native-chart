export interface DataInterface {
  id: number | null;
  name: string | null;
  value: string | null;
}

export interface FormDataInterface extends DataInterface {
  firstModule: DataInterface[] | null;
  secondModule: DataInterface[] | null;
}
