import {DefaultCrudRepository} from '@loopback/repository';
import {KalUltra, KalUltraRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class KalUltraRepository extends DefaultCrudRepository<
  KalUltra,
  typeof KalUltra.prototype.id,
  KalUltraRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(KalUltra, dataSource);
  }
}
