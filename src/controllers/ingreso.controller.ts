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
import {Ingresos, Neumaticos} from '../models';
import {IngresosRepository, NeumaticosRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class IngresoController {
  constructor(
    @repository(IngresosRepository)
    public ingresosRepository : IngresosRepository,
    @repository(NeumaticosRepository)
    public neumaticosRepository: NeumaticosRepository
  ) {}

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @post('/ingresos', {
    responses: {
      '200': {
        description: 'Ingresos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingresos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingresos, {
            title: 'NewIngresos',
            exclude: ['id'],
          }),
        },
      },
    })
    ingresos: Omit<Ingresos, 'id'>,
  ): Promise<Ingresos> {
    let neumaticoExiste;
    try {
      neumaticoExiste = await this.neumaticosRepository.findById(ingresos.neumaticosserie);
      // eslint-disable-next-line no-empty
    }catch (e) {}

    if (!neumaticoExiste){
      await this.neumaticosRepository.create(new Neumaticos(
      {serie: ingresos.neumaticosserie, estadoActual: 'INGRESADO'}

    ));

    }else {
      if (neumaticoExiste.estadoActual === 'BAJA')
        throw new HttpErrors.Conflict('El neumatico no puede ser ingresado de nuevo');

      if (neumaticoExiste.estadoActual !== 'FACTURADO' && neumaticoExiste.estadoActual === 'INGRESADO')
        throw new HttpErrors.Conflict('El neumatico ya esta en el proceso')
    }
    return this.ingresosRepository.create(ingresos);


  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @get('/ingresos/count', {
    responses: {
      '200': {
        description: 'Ingresos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Ingresos)) where?: Where<Ingresos>,
  ): Promise<Count> {
    return this.ingresosRepository.count(where);

  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @get('/ingresos', {
    responses: {
      '200': {
        description: 'Array of Ingresos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ingresos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ingresos)) filter?: Filter<Ingresos>,
  ): Promise<Ingresos[]> {
   //return this.ingresosRepository.execute('select ingresos.id,faena,guia_despacho,patente_camion,guia_kt,fecha,comentario from ingresos,clientes where ingresos.clientesid = clientes.id',[])
    return this.ingresosRepository.find(filter);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @get('/ingresados', {
    responses: {
      '200': {
        description: 'objetos of Ingresos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  })async todosIngresados():Promise<object>{
    return this
      .ingresosRepository
      .execute('select ingresos.id,neumaticosserie,faena,guia_despacho,patente_camion,guia_kt,fecha,comentario,ruta_foto from ingresos,clientes,neumaticos where ingresos.clientesid = clientes.id and ingresos.neumaticosserie = neumaticos.serie and neumaticos.estado_actual = \'INGRESADO\'', [])
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @patch('/ingresos', {
    responses: {
      '200': {
        description: 'Ingresos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingresos, {partial: true}),
        },
      },
    })
    ingresos: Ingresos,
    @param.query.object('where', getWhereSchemaFor(Ingresos)) where?: Where<Ingresos>,
  ): Promise<Count> {
    return this.ingresosRepository.updateAll(ingresos, where);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @get('/ingresos/{id}', {
    responses: {
      '200': {
        description: 'Ingresos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ingresos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Ingresos)) filter?: Filter<Ingresos>
  ): Promise<Ingresos> {
    return this.ingresosRepository.findById(id, filter);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @patch('/ingresos/{id}', {
    responses: {
      '204': {
        description: 'Ingresos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingresos, {partial: true}),
        },
      },
    })
    ingresos: Ingresos,
  ): Promise<void> {
    await this.ingresosRepository.updateById(id, ingresos);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @put('/ingresos/{id}', {
    responses: {
      '204': {
        description: 'Ingresos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ingresos: Ingresos,
  ): Promise<void> {
    await this.ingresosRepository.replaceById(id, ingresos);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @del('/ingresos/{id}', {
    responses: {
      '204': {
        description: 'Ingresos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ingresosRepository.deleteById(id);
  }
}
