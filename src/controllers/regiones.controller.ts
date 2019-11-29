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
import {Regiones} from '../models';
import {RegionesRepository} from '../repositories';

export class RegionesController {
  constructor(
    @repository(RegionesRepository)
    public regionesRepository : RegionesRepository,
  ) {}

  @post('/regiones', {
    responses: {
      '200': {
        description: 'Regiones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Regiones)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regiones, {
            title: 'NewRegiones',
            exclude: ['id'],
          }),
        },
      },
    })
    regiones: Omit<Regiones, 'id'>,
  ): Promise<Regiones> {
    return this.regionesRepository.create(regiones);
  }

  @get('/regiones/count', {
    responses: {
      '200': {
        description: 'Regiones model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Regiones)) where?: Where<Regiones>,
  ): Promise<Count> {
    return this.regionesRepository.count(where);
  }

  @get('/regiones', {
    responses: {
      '200': {
        description: 'Array of Regiones model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Regiones, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Regiones)) filter?: Filter<Regiones>,
  ): Promise<Regiones[]> {
    return this.regionesRepository.find(filter);
  }

  @patch('/regiones', {
    responses: {
      '200': {
        description: 'Regiones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regiones, {partial: true}),
        },
      },
    })
    regiones: Regiones,
    @param.query.object('where', getWhereSchemaFor(Regiones)) where?: Where<Regiones>,
  ): Promise<Count> {
    return this.regionesRepository.updateAll(regiones, where);
  }

  @get('/regiones/{id}', {
    responses: {
      '200': {
        description: 'Regiones model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Regiones, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Regiones)) filter?: Filter<Regiones>
  ): Promise<Regiones> {
    return this.regionesRepository.findById(id, filter);
  }

  @patch('/regiones/{id}', {
    responses: {
      '204': {
        description: 'Regiones PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regiones, {partial: true}),
        },
      },
    })
    regiones: Regiones,
  ): Promise<void> {
    await this.regionesRepository.updateById(id, regiones);
  }

  @put('/regiones/{id}', {
    responses: {
      '204': {
        description: 'Regiones PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() regiones: Regiones,
  ): Promise<void> {
    await this.regionesRepository.replaceById(id, regiones);
  }

  @del('/regiones/{id}', {
    responses: {
      '204': {
        description: 'Regiones DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.regionesRepository.deleteById(id);
  }
}
