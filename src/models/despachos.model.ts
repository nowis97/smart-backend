import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'despachos'}}})
export class Despachos extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    id: 1,
    mssql: {columnName: 'guia_despacho', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  guiaDespacho: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'fecha', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
    length: 6,
    mssql: {columnName: 'patente_camion', dataType: 'varchar', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  patenteCamion: string;

  @property({
    type: 'string',
    length: 2147483647,
    mssql: {columnName: 'comentarios', dataType: 'text', dataLength: 2147483647, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  comentarios?: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'procesosid', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  procesosid: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Despachos>) {
    super(data);
  }
}

export interface DespachosRelations {
  // describe navigational properties here
}

export type DespachosWithRelations = Despachos & DespachosRelations;
