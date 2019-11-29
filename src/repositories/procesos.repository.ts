import {DefaultCrudRepository} from '@loopback/repository';
import {Procesos, ProcesosRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProcesosRepository extends DefaultCrudRepository<
  Procesos,
  typeof Procesos.prototype.id,
  ProcesosRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Procesos, dataSource);
  }
}
