import {DefaultCrudRepository} from '@loopback/repository';
import {Despachos, DespachosRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DespachosRepository extends DefaultCrudRepository<
  Despachos,
  typeof Despachos.prototype.guiaDespacho,
  DespachosRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Despachos, dataSource);
  }
}
