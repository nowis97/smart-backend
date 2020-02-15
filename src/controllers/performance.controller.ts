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
import {Performance} from '../models';
import {PerformanceRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class PerformanceController {
  constructor(
    @repository(PerformanceRepository)
    public performanceRepository : PerformanceRepository,
  ) {}

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','performance'])
  @post('/performance', {
    responses: {
      '200': {
        description: 'Performance model instance',
        content: {'application/json': {schema: getModelSchemaRef(Performance)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Performance, {
            title: 'NewPerformance',
            exclude: ['id'],
          }),
        },
      },
    })
    performance: Omit<Performance, 'id'>,
  ): Promise<Performance> {
    return this.performanceRepository.create(performance);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','performance'])
  @get('/performance/count', {
    responses: {
      '200': {
        description: 'Performance model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Performance)) where?: Where<Performance>,
  ): Promise<Count> {
    return this.performanceRepository.count(where);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','performance'])
  @get('/performance', {
    responses: {
      '200': {
        description: 'Array of Performance model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Performance, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Performance)) filter?: Filter<Performance>,
  ): Promise<Performance[]> {
    return this.performanceRepository.find(filter);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','performance'])
  @patch('/performance', {
    responses: {
      '200': {
        description: 'Performance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Performance, {partial: true}),
        },
      },
    })
    performance: Performance,
    @param.query.object('where', getWhereSchemaFor(Performance)) where?: Where<Performance>,
  ): Promise<Count> {
    return this.performanceRepository.updateAll(performance, where);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','performance'])
  @get('/performance/{id}', {
    responses: {
      '200': {
        description: 'Performance model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Performance, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Performance)) filter?: Filter<Performance>
  ): Promise<Performance> {
    return this.performanceRepository.findById(id, filter);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','performance'])
  @patch('/performance/{id}', {
    responses: {
      '204': {
        description: 'Performance PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Performance, {partial: true}),
        },
      },
    })
    performance: Performance,
  ): Promise<void> {
    await this.performanceRepository.updateById(id, performance);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','performance'])
  @put('/performance/{id}', {
    responses: {
      '204': {
        description: 'Performance PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() performance: Performance,
  ): Promise<void> {
    await this.performanceRepository.replaceById(id, performance);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','performance'])
  @del('/performance/{id}', {
    responses: {
      '204': {
        description: 'Performance DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.performanceRepository.deleteById(id);
  }
}
