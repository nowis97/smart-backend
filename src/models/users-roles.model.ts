import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'users_roles'}}})
export class UsersRoles extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    id: 1,
    mssql: {columnName: 'usersid', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  usersid: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    id: 2,
    mssql: {columnName: 'rolesid', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  rolesid: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UsersRoles>) {
    super(data);
  }
}

export interface UsersRolesRelations {
  // describe navigational properties here
}

export type UsersRolesWithRelations = UsersRoles & UsersRolesRelations;
