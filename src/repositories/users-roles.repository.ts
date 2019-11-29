import {DefaultCrudRepository} from '@loopback/repository';
import {UsersRoles, UsersRolesRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UsersRolesRepository extends DefaultCrudRepository<
  UsersRoles,
  typeof UsersRoles.prototype.usersid,
  UsersRolesRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(UsersRoles, dataSource);
  }
}
