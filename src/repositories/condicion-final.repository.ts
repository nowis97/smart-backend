import {DefaultCrudRepository} from '@loopback/repository';
import {CondicionFinal, CondicionFinalRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CondicionFinalRepository extends DefaultCrudRepository<
  CondicionFinal,
  typeof CondicionFinal.prototype.id,
  CondicionFinalRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(CondicionFinal, dataSource);
  }
}
