import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'neumaticos'}}})
export class Neumaticos extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 127,
    id: 1,
    mssql: {columnName: 'serie', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  serie: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'estado_actual', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  estadoActual: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'catalogocatalogue_number', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  catalogocatalogueNumber?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Neumaticos>) {
    super(data);
  }
}

export interface NeumaticosRelations {
  // describe navigational properties here
}

export type NeumaticosWithRelations = Neumaticos & NeumaticosRelations;
