import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'trabajos'}}})
export class Trabajos extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    id: 1,
    mssql: {columnName: 'orden_trabajo', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  ordenTrabajo: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'fecha_produccion', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fechaProduccion: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'condicion_finalid', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  condicionFinalid: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'plantaid', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  plantaid: number;

  @property({
    type: 'number',
    required: true,
    precision: 19,
    scale: 0,
    mssql: {columnName: 'recepcionesid', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'NO'},
  })
  recepcionesid: number;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'codigos_bajascode', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  codigosBajascode?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Trabajos>) {
    super(data);
  }
}

export interface TrabajosRelations {
  // describe navigational properties here
}

export type TrabajosWithRelations = Trabajos & TrabajosRelations;
