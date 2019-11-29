import {DefaultCrudRepository} from '@loopback/repository';
import {Trabajos, TrabajosRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TrabajosRepository extends DefaultCrudRepository<
  Trabajos,
  typeof Trabajos.prototype.ordenTrabajo,
  TrabajosRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Trabajos, dataSource);
  }
}
