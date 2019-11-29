import {DefaultCrudRepository} from '@loopback/repository';
import {Recepciones, RecepcionesRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RecepcionesRepository extends DefaultCrudRepository<
  Recepciones,
  typeof Recepciones.prototype.id,
  RecepcionesRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Recepciones, dataSource);
  }
}
