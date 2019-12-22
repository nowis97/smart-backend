import {DefaultCrudRepository} from '@loopback/repository';
import {CodigosBajas, CodigosBajasRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CodigosBajasRepository extends DefaultCrudRepository<
  CodigosBajas,
  typeof CodigosBajas.prototype.code,
  CodigosBajasRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(CodigosBajas, dataSource);
  }
}
