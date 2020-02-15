import {DefaultCrudRepository} from '@loopback/repository';
import {Tire, TireRelations} from '../models';
import {TomsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TireRepository extends DefaultCrudRepository<
  Tire,
  typeof Tire.prototype.id,
  TireRelations
> {
  constructor(
    @inject('datasources.toms') dataSource: TomsDataSource,
  ) {
    super(Tire, dataSource);
  }
}
