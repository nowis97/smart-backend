import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'renovado'}}})
export class Renovado extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 127,
    mssql: {columnName: 'codigo_caucho_base', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  codigoCauchoBase: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'caucho_utilizado', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  cauchoUtilizado: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'otd_renovado', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  otdRenovado: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'peso_carcasa', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  pesoCarcasa: number;

  @property({
    type: 'number',
    required: false,
    precision: 19,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'tipo_renovadoid', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  tipoRenovadoid: number;

  @property({
    type: 'string',
    required: true,
    length: 127,
    mssql: {columnName: 'codigo_caucho_banda', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  codigoCauchoBanda: string;

  @property({
    type: 'string',
    length: 127,
    mssql: {columnName: 'codigo_caucho_banda_2', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  codigoCauchoBanda2?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Renovado>) {
    super(data);
  }
}

export interface RenovadoRelations {
  // describe navigational properties here
}

export type RenovadoWithRelations = Renovado & RenovadoRelations;
