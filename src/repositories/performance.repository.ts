import {DefaultCrudRepository} from '@loopback/repository';
import {Performance, PerformanceRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PerformanceRepository extends DefaultCrudRepository<
  Performance,
  typeof Performance.prototype.id,
  PerformanceRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Performance, dataSource);
  }
}
