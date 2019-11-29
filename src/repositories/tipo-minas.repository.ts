import {DefaultCrudRepository} from '@loopback/repository';
import {TipoMinas, TipoMinasRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TipoMinasRepository extends DefaultCrudRepository<
  TipoMinas,
  typeof TipoMinas.prototype.id,
  TipoMinasRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(TipoMinas, dataSource);
  }
}
