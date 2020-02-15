import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Facturas} from '../models';
import {DespachosRepository, FacturasRepository, NeumaticosRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class FacturasController {
  constructor(
    @repository(FacturasRepository)
    public facturasRepository : FacturasRepository,
    @repository(NeumaticosRepository)
    public neumaticosRepository:NeumaticosRepository,
    @repository(DespachosRepository)
    public despachosRepository : DespachosRepository,
  ) {}

  @post('/facturas', {
    responses: {
      '200': {
        description: 'Facturas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Facturas)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturas, {
            title: 'NewFacturas',
            
          }),
        },
      },
    })
    facturas: Facturas,
  ): Promise<Facturas> {
    return this.facturasRepository.create(facturas);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','facturacion'])
  @post('/facturas/facturar',{
    responses:{
      200:{
        description: 'returns inserted Factura',
        content: {'application/json': {schema: getModelSchemaRef(Facturas)}},
      }
    }
  })async facturar(@requestBody({
    content:{
      'application/json':{
        schema:{}
      }
    }
  }) factura:Object): Promise<Facturas>{

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const despacho = await this.despachosRepository.findById(factura.guiaDespacho);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (new Date(factura.fecha).getTime() <= new Date(despacho.fecha).getTime())
      throw new HttpErrors.BadRequest('La fecha de facturacion debe ser mayor que la de despacho');

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await this.neumaticosRepository.updateById(factura.serie, {estadoActual: 'FACTURADO'});
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.create(new Facturas({numeroFactura:factura.numeroFactura,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      fecha:factura.fecha,estadoPago:factura.estadoPago,despachosguiaDespacho:factura.guiaDespacho}))
  }

  @get('/facturas/count', {
    responses: {
      '200': {
        description: 'Facturas model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Facturas)) where?: Where<Facturas>,
  ): Promise<Count> {
    return this.facturasRepository.count(where);
  }

  @get('/facturas', {
    responses: {
      '200': {
        description: 'Array of Facturas model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Facturas, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Facturas)) filter?: Filter<Facturas>,
  ): Promise<Facturas[]> {
    return this.facturasRepository.find(filter);
  }

  @patch('/facturas', {
    responses: {
      '200': {
        description: 'Facturas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturas, {partial: true}),
        },
      },
    })
    facturas: Facturas,
    @param.query.object('where', getWhereSchemaFor(Facturas)) where?: Where<Facturas>,
  ): Promise<Count> {
    return this.facturasRepository.updateAll(facturas, where);
  }

  @get('/facturas/{id}', {
    responses: {
      '200': {
        description: 'Facturas model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Facturas, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Facturas)) filter?: Filter<Facturas>
  ): Promise<Facturas> {
    return this.facturasRepository.findById(id, filter);
  }

  @patch('/facturas/{id}', {
    responses: {
      '204': {
        description: 'Facturas PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturas, {partial: true}),
        },
      },
    })
    facturas: Facturas,
  ): Promise<void> {
    await this.facturasRepository.updateById(id, facturas);
  }

  @put('/facturas/{id}', {
    responses: {
      '204': {
        description: 'Facturas PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() facturas: Facturas,
  ): Promise<void> {
    await this.facturasRepository.replaceById(id, facturas);
  }

  @del('/facturas/{id}', {
    responses: {
      '204': {
        description: 'Facturas DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.facturasRepository.deleteById(id);
  }
}
