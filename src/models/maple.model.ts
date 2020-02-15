import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'maple'}}})
export class Maple extends Entity {
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
    length: 127,
    id: 2,
    mssql: {columnName: 'numero_factura', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  numeroFactura: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'ahorro_co2', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  ahorroCo2: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'ahorro_diesel', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  ahorroDiesel: number;

  @property({
    type: 'number',
    required: true,
    precision: 24,
    mssql: {columnName: 'ahorro_emisiones_co2', dataType: 'real', dataLength: null, dataPrecision: 24, dataScale: null, nullable: 'NO'},
  })
  ahorroEmisionesCo2: number;

  @property({
    type: 'string',
    required: true,
    length: 127,
    mssql: {columnName: 'cod_producto', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  codProducto: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'nombre_producto', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  nombreProducto: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Maple>) {
    super(data);
  }
}

export interface MapleRelations {
  // describe navigational properties here
}

export type MapleWithRelations = Maple & MapleRelations;
