import {DefaultCrudRepository} from '@loopback/repository';
import {Maple, MapleRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MapleRepository extends DefaultCrudRepository<
  Maple,
  typeof Maple.prototype.serie,
  MapleRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Maple, dataSource);
  }
}
