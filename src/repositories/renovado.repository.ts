import {DefaultCrudRepository} from '@loopback/repository';
import {Renovado, RenovadoRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RenovadoRepository extends DefaultCrudRepository<
  Renovado,
  typeof Renovado.prototype.id,
  RenovadoRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Renovado, dataSource);
  }
}
