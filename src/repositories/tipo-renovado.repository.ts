import {DefaultCrudRepository} from '@loopback/repository';
import {TipoRenovado, TipoRenovadoRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TipoRenovadoRepository extends DefaultCrudRepository<
  TipoRenovado,
  typeof TipoRenovado.prototype.id,
  TipoRenovadoRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(TipoRenovado, dataSource);
  }
}
