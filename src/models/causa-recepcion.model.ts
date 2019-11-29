import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'causa_recepcion'}}
})
export class CausaRecepcion extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 127,
    mssql: {columnName: 'nombre', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  nombre: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CausaRecepcion>) {
    super(data);
  }
}

export interface CausaRecepcionRelations {
  // describe navigational properties here
}

export type CausaRecepcionWithRelations = CausaRecepcion & CausaRecepcionRelations;
