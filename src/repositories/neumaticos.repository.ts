import {DefaultCrudRepository} from '@loopback/repository';
import {Neumaticos, NeumaticosRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NeumaticosRepository extends DefaultCrudRepository<
  Neumaticos,
  typeof Neumaticos.prototype.serie,
  NeumaticosRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Neumaticos, dataSource);
  }
}
