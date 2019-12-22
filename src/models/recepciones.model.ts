
import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'recepciones'}}})
export class Recepciones extends Entity {
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
    mssql: {columnName: 'kms_operacion', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  kmsOperacion: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'hrs_operacion', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  hrsOperacion: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'rtd', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  rtd: number;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'fecha', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
    precision: 19,
    scale: 0,
    mssql: {columnName: 'ingresosid', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'NO'},
  })
  ingresosid: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'causa_recepcionid', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  causaRecepcionid: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Recepciones>) {
    super(data);
  }
}

export interface RecepcionesRelations {
  // describe navigational properties here
}

export type RecepcionesWithRelations = Recepciones & RecepcionesRelations;
