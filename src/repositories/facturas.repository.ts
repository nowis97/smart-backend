import {DefaultCrudRepository} from '@loopback/repository';
import {Facturas, FacturasRelations} from '../models';
import {SmartClDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacturasRepository extends DefaultCrudRepository<
  Facturas,
  typeof Facturas.prototype.numeroFactura,
  FacturasRelations
> {
  constructor(
    @inject('datasources.smart_cl') dataSource: SmartClDataSource,
  ) {
    super(Facturas, dataSource);
  }
}
