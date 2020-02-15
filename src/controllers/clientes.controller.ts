import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Clientes} from '../models';
import {ClientesRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class ClientesController {
  constructor(
    @repository(ClientesRepository)
    public clientesRepository : ClientesRepository,

  ) {}
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','clientes'])
  @post('/clientes', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Clientes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {
            title: 'NewClientes',
            exclude: ['id'],
          }),
        },
      },
    })
    clientes: Omit<Clientes, 'id'>,
  ): Promise<Clientes> {
    return this.clientesRepository.create(clientes);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','clientes'])
  @get('/clientes/count', {
    responses: {
      '200': {
        description: 'Clientes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Clientes)) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.count(where);
  }
  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/clientes', {
    responses: {
      '200': {
        description: 'Array of Clientes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Clientes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Clientes)) filter?: Filter<Clientes>,
  ): Promise<Clientes[]> {
    return this.clientesRepository.find(filter);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','clientes'])
  @patch('/clientes', {
    responses: {
      '200': {
        description: 'Clientes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Clientes,
    @param.query.object('where', getWhereSchemaFor(Clientes)) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.updateAll(clientes, where);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','clientes'])
  @get('/clientes/{id}', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Clientes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Clientes)) filter?: Filter<Clientes>
  ): Promise<Clientes> {
    return this.clientesRepository.findById(id, filter);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','clientes'])
  @patch('/clientes/{id}', {
    responses: {
      '204': {
        description: 'Clientes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.updateById(id, clientes);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','clientes'])
  @put('/clientes/{id}', {
    responses: {
      '204': {
        description: 'Clientes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.replaceById(id, clientes);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','clientes'])
  @del('/clientes/{id}', {
    responses: {
      '204': {
        description: 'Clientes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clientesRepository.deleteById(id);
  }
}
