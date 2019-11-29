import {DefaultCrudRepository} from '@loopback/repository';
import {Catalogo, CatalogoRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CatalogoRepository extends DefaultCrudRepository<
  Catalogo,
  typeof Catalogo.prototype.catalogueNumber,
  CatalogoRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Catalogo, dataSource);
  }
}
