import {DefaultCrudRepository} from '@loopback/repository';
import {Correctiva, CorrectivaRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CorrectivaRepository extends DefaultCrudRepository<
  Correctiva,
  typeof Correctiva.prototype.id,
  CorrectivaRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Correctiva, dataSource);
  }
}
