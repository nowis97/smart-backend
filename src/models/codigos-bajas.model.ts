import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'codigos_bajas'}}})
export class CodigosBajas extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 100,
    mssql: {columnName: 'primary_reason', dataType: 'nvarchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  primaryReason: string;

  @property({
    type: 'string',
    length: 100,
    mssql: {columnName: 'secundary_reason', dataType: 'nvarchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  secundaryReason?: string;

  @property({
    type: 'string',
    length: 100,
    mssql: {columnName: 'tertiary_reason', dataType: 'nvarchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  tertiaryReason?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    id: 1,
    mssql: {columnName: 'code', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  code: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CodigosBajas>) {
    super(data);
  }
}

export interface CodigosBajasRelations {
  // describe navigational properties here
}

export type CodigosBajasWithRelations = CodigosBajas & CodigosBajasRelations;
