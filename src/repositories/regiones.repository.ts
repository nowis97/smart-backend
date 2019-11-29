import {DefaultCrudRepository} from '@loopback/repository';
import {Regiones, RegionesRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RegionesRepository extends DefaultCrudRepository<
  Regiones,
  typeof Regiones.prototype.id,
  RegionesRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Regiones, dataSource);
  }
}
