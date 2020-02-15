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
import {Despachos} from '../models';
import {DespachosRepository, NeumaticosRepository, ProcesosRepository, TrabajosRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class DespachosController {
  constructor(
    @repository(DespachosRepository)
    public despachosRepository : DespachosRepository,
    @repository(NeumaticosRepository)
    public neumaticosRepository:NeumaticosRepository,
    @repository(ProcesosRepository)
    public procesosRepository: ProcesosRepository,
    @repository(TrabajosRepository)
    public trabajosRepository : TrabajosRepository
  ) {}
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','despacho'])
  @post('/despachos', {
    responses: {
      '200': {
        description: 'Despachos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Despachos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Despachos, {
            title: 'NewDespachos'

          }),
        },
      },
    })
    despachos: Despachos,
  ): Promise<Despachos> {

    return this.despachosRepository.create(despachos);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','despacho'])
  @get('/despachos/count', {
    responses: {
      '200': {
        description: 'Despachos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Despachos)) where?: Where<Despachos>,
  ): Promise<Count> {
    return this.despachosRepository.count(where);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','facturacion','despachos'])
  @get('/despachados',{
    responses:{
      200:{
        description: 'Neumaticos despachados',
        content:{
          'application/json':{
            schema:{ type:'array'}
          }
        }
      }
    }
  })async despachados():Promise<Object>{
    return this.despachosRepository.execute('select neumaticos.serie,despachos.patente_camion,clientes.faena,despachos.guia_despacho,procesos.garantia,despachos.fecha,ingresos.ruta_foto\n' +
      'from despachos,procesos, trabajos,recepciones,ingresos,neumaticos,clientes\n' +
      'where despachos.procesosid = procesos.id and procesos.trabajosorden_trabajo = trabajos.orden_trabajo  and trabajos.recepcionesid = recepciones.id\n' +
        'and recepciones.ingresosid = ingresos.id and ingresos.neumaticosserie = neumaticos.serie and ingresos.clientesid = clientes.id AND neumaticos.estado_actual = \'DESPACHADO\'\n',[])
  }


  @secured(SecuredType.HAS_ANY_ROLE,['superuser','despacho'])
  @get('/despachos', {
    responses: {
      '200': {
        description: 'Array of Despachos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Despachos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Despachos)) filter?: Filter<Despachos>,
  ): Promise<Despachos[]> {
    return this.despachosRepository.find(filter);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','despacho'])
  @patch('/despachos', {
    responses: {
      '200': {
        description: 'Despachos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Despachos, {partial: true}),
        },
      },
    })
    despachos: Despachos,
    @param.query.object('where', getWhereSchemaFor(Despachos)) where?: Where<Despachos>,
  ): Promise<Count> {
    return this.despachosRepository.updateAll(despachos, where);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','despacho'])
  @get('/despachos/{id}', {
    responses: {
      '200': {
        description: 'Despachos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Despachos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Despachos)) filter?: Filter<Despachos>
  ): Promise<Despachos> {
    return this.despachosRepository.findById(id, filter);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','despacho'])
  @patch('/despachos/{id}', {
    responses: {
      '204': {
        description: 'Despachos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Despachos, {partial: true}),
        },
      },
    })
    despachos: Despachos,
  ): Promise<void> {
    await this.despachosRepository.updateById(id, despachos);
  }

  @put('/despachos/{id}', {
    responses: {
      '204': {
        description: 'Despachos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() despachos: Despachos,
  ): Promise<void> {
    await this.despachosRepository.replaceById(id, despachos);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','despacho'])
  @del('/despachos/{id}', {
    responses: {
      '204': {
        description: 'Despachos DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.despachosRepository.deleteById(id);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','despacho'])
  @post('/despachos/despachar')
  async despachar(@requestBody({
    content: {
      'application/json': {
        schema: {type: 'object',},
      },
    },
  }) neumatico:Object):Promise<Despachos>{

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const proceso = await this.procesosRepository.findById(neumatico.despacho.procesosid);

    const trabajo = await this.trabajosRepository.findById(proceso.trabajosordenTrabajo);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (((new Date(neumatico.despacho.fecha)).getTime()) <= (new Date(trabajo.fechaProduccion)).getTime())
      throw new HttpErrors.BadRequest('La fecha de despacho debe ser mayor que la de producción');

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await this.neumaticosRepository.updateById(neumatico.serie,{estadoActual:'DESPACHADO'});
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.create(neumatico.despacho)
  }
}
