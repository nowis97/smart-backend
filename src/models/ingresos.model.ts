import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'ingresos'}}})
export class Ingresos extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 19,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 127,
    mssql: {columnName: 'guia_despacho', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  guiaDespacho: string;

  @property({
    type: 'string',
    required: true,
    length: 6,
    mssql: {columnName: 'patente_camion', dataType: 'varchar', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  patenteCamion: string;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    mssql: {columnName: 'guia_kt', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'NO'},
  })
  guiaKt: number;

  @property({
    type: 'string',
    length: 2147483647,
    mssql: {columnName: 'comentario', dataType: 'text', dataLength: 2147483647, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  comentario?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'ruta_foto', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  rutaFoto?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'clientesid', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  clientesid: number;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'fecha', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
    length: 127,
    mssql: {columnName: 'neumaticosserie', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  neumaticosserie: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ingresos>) {
    super(data);
  }
}

export interface IngresosRelations {
  // describe navigational properties here
}

export type IngresosWithRelations = Ingresos & IngresosRelations;
