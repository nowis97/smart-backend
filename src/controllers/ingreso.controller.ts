import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Ingresos} from '../models';
import {IngresosRepository} from '../repositories';

export class IngresoController {
  constructor(
    @repository(IngresosRepository)
    public ingresosRepository : IngresosRepository,
  ) {}

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
    return this.ingresosRepository.create(ingresos);
  }

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
    return this.ingresosRepository.find(filter);
  }

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