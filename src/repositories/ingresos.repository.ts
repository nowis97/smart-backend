import {DefaultCrudRepository} from '@loopback/repository';
import {Ingresos, IngresosRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class IngresosRepository extends DefaultCrudRepository<
  Ingresos,
  typeof Ingresos.prototype.id,
  IngresosRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Ingresos, dataSource);

  }
}
