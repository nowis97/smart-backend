import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'facturas'}}})
export class Facturas extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    id: 1,
    mssql: {columnName: 'numero_factura', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  numeroFactura: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'fecha', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fecha: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'estado_pago', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  estadoPago: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    mssql: {columnName: 'despachosguia_despacho', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  despachosguiaDespacho: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Facturas>) {
    super(data);
  }
}

export interface FacturasRelations {
  // describe navigational properties here
}

export type FacturasWithRelations = Facturas & FacturasRelations;
