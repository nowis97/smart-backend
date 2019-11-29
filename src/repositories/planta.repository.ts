import {DefaultCrudRepository} from '@loopback/repository';
import {Planta, PlantaRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlantaRepository extends DefaultCrudRepository<
  Planta,
  typeof Planta.prototype.id,
  PlantaRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Planta, dataSource);
  }
}
