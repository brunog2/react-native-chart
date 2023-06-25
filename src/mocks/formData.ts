import {FormDataInterface} from '../types/FormDataType/formDataType';

export const formData: FormDataInterface[] = [
  {
    id: 1,
    name: 'Elemento 1',
    value: 'Valor 1',
    firstModule: [
      {id: 1, name: 'Módulo 1.1', value: 'Valor 1.1'},
      {id: 2, name: 'Módulo 1.2', value: 'Valor 1.2'},
      {id: 3, name: 'Módulo 1.3', value: 'Valor 1.3'},
    ],
    secondModule: [
      {id: 4, name: 'Módulo 2.1', value: 'Valor 2.1'},
      {id: 5, name: 'Módulo 2.2', value: 'Valor 2.2'},
    ],
  },
  {
    id: 2,
    name: 'Elemento 2',
    value: 'Valor 2',
    firstModule: [
      {id: 6, name: 'Módulo 1.1', value: 'Valor 1.1'},
      {id: 7, name: 'Módulo 1.2', value: 'Valor 1.2'},
    ],
    secondModule: [
      {id: 8, name: 'Módulo 2.1', value: 'Valor 2.1'},
      {id: 9, name: 'Módulo 2.2', value: 'Valor 2.2'},
      {id: 10, name: 'Módulo 2.3', value: 'Valor 2.3'},
    ],
  },
  {
    id: 3,
    name: 'Elemento 3',
    value: 'Valor 3',
    firstModule: [{id: 11, name: 'Módulo 1.1', value: 'Valor 1.1'}],
    secondModule: [
      {id: 12, name: 'Módulo 2.1', value: 'Valor 2.1'},
      {id: 13, name: 'Módulo 2.2', value: 'Valor 2.2'},
      {id: 14, name: 'Módulo 2.3', value: 'Valor 2.3'},
      {id: 15, name: 'Módulo 2.4', value: 'Valor 2.4'},
    ],
  },
  {
    id: 4,
    name: 'Elemento 4',
    value: 'Valor 4',
    firstModule: [
      {id: 16, name: 'Módulo 1.1', value: 'Valor 1.1'},
      {id: 17, name: 'Módulo 1.2', value: 'Valor 1.2'},
      {id: 18, name: 'Módulo 1.3', value: 'Valor 1.3'},
    ],
    secondModule: [{id: 19, name: 'Módulo 2.1', value: 'Valor 2.1'}],
  },
  {
    id: 5,
    name: 'Elemento 5',
    value: 'Valor 5',
    firstModule: [],
    secondModule: [],
  },
];
