import {DefaultCrudRepository} from '@loopback/repository';
import {CausaRecepcion, CausaRecepcionRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CausaRecepcionRepository extends DefaultCrudRepository<
  CausaRecepcion,
  typeof CausaRecepcion.prototype.id,
  CausaRecepcionRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(CausaRecepcion, dataSource);
  }
}
