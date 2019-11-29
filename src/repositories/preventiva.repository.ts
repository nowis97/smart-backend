import {DefaultCrudRepository} from '@loopback/repository';
import {Preventiva, PreventivaRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PreventivaRepository extends DefaultCrudRepository<
  Preventiva,
  typeof Preventiva.prototype.id,
  PreventivaRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Preventiva, dataSource);
  }
}
