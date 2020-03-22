import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'procesos'}}})
export class Procesos extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mssql: {columnName: 'garantia', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'NO'},
  })
  garantia: number;

  @property({
    type: 'number',
    precision: 19,
    scale: 0,
    mssql: {columnName: 'kal_ultraid', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'YES'},
  })
  kalUltraid?: number;

  @property({
    type: 'number',
    precision: 19,
    scale: 0,
    mssql: {columnName: 'correctivaid', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'YES'},
  })
  correctivaid?: number;

  @property({
    type: 'number',
    precision: 19,
    scale: 0,
    mssql: {columnName: 'preventivaid', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'YES'},
  })
  preventivaid?: number;

  @property({
    type: 'number',
    precision: 19,
    scale: 0,
    mssql: {columnName: 'renovadoid', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'YES'},
  })
  renovadoid?: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'trabajosorden_trabajo', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  trabajosordenTrabajo: string;

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'hrs_garantia', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  hrsGarantia: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Procesos>) {
    super(data);
  }
}

export interface ProcesosRelations {
  // describe navigational properties here
}

export type ProcesosWithRelations = Procesos & ProcesosRelations;
