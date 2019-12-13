import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'catalogo'}}})
export class Catalogo extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'catalogue_number', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  catalogueNumber: number;

  @property({
    type: 'string',
    required: true,
    length: 128,
    mssql: {columnName: 'manufacturer', dataType: 'varchar', dataLength: 128, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  manufacturer: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'primary_man_part_number', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  primaryManPartNumber?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'tkph', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  tkph?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'otd', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  otd?: number;

  @property({
    type: 'number',
    precision: 19,
    scale: 0,
    mssql: {columnName: 'diameter', dataType: 'decimal', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'YES'},
  })
  diameter?: number;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'construction', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  construction?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'pattern_tread_design', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  patternTreadDesign?: string;

  @property({
    type: 'string',
    length: 255,
    mssql: {columnName: 'compound', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  compound?: string;

  @property({
    type: 'string',
    length: 128,
    mssql: {columnName: 'tra_code', dataType: 'varchar', dataLength: 128, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  traCode?: string;

  @property({
    type: 'string',
    length: 128,
    mssql: {columnName: 'directional', dataType: 'varchar', dataLength: 128, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  directional?: string;

  @property({
    type: 'string',
    length: 5,
    mssql: {columnName: 'star_ply_rating', dataType: 'varchar', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  starPlyRating?: string;

  @property({
    type: 'string',
    required: true,
    length: 127,
    mssql: {columnName: 'size', dataType: 'varchar', dataLength: 127, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  size: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Catalogo>) {
    super(data);
  }
}

export interface CatalogoRelations {
  // describe navigational properties here
}

export type CatalogoWithRelations = Catalogo & CatalogoRelations;
