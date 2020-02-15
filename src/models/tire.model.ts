import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'tire'}}})
export class Tire extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    id:true,
    mssql: {columnName: 'id', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  id: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'status', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  status?: string;

  @property({
    type: 'date',
    mssql: {columnName: 'first_fitment_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  firstFitmentDate?: string;

  @property({
    type: 'string',
    length: 200,
    mssql: {columnName: 'size', dataType: 'varchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  size?: string;

  @property({
    type: 'string',
    length: 5,
    mssql: {columnName: 'compound', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  compound?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'rtd_average', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  rtdAverage?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'otd', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  otd?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'hours', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  hours?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'distance', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  distance?: number;

  @property({
    type: 'date',
    mssql: {columnName: 'scrap_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  scrapDate?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'scrap_reason', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  scrapReason?: string;

  @property({
    type: 'string',
    length: 5,
    mssql: {columnName: 'manufacture_code', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  manufactureCode?: string;

  @property({
    type: 'string',
    length: 45,
    mssql: {columnName: 'pattern', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  pattern?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'rtd_inner', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  rtdInner?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'rtd_outer', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  rtdOuter?: number;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'organization', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  organization?: string;

  @property({
    type: 'number',
    precision: 53,
    mssql: {columnName: 'purchase_cost', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  purchaseCost?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'min_td', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  minTd?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'n_catalogue', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  nCatalogue?: number;

  @property({
    type: 'string',
    length: 128,
    mssql: {columnName: 'casing_serial_no', dataType: 'varchar', dataLength: 128, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  casingSerialNo?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'organization_concat_id', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  organizationConcatId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tire>) {
    super(data);
  }
}

export interface TireRelations {
  // describe navigational properties here
}

export type TireWithRelations = Tire & TireRelations;
