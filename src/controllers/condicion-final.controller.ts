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
import {CondicionFinal} from '../models';
import {CondicionFinalRepository} from '../repositories';

export class CondicionFinalController {
  constructor(
    @repository(CondicionFinalRepository)
    public condicionFinalRepository : CondicionFinalRepository,
  ) {}

  @post('/condicion-final', {
    responses: {
      '200': {
        description: 'CondicionFinal model instance',
        content: {'application/json': {schema: getModelSchemaRef(CondicionFinal)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CondicionFinal, {
            title: 'NewCondicionFinal',
            exclude: ['id'],
          }),
        },
      },
    })
    condicionFinal: Omit<CondicionFinal, 'id'>,
  ): Promise<CondicionFinal> {
    return this.condicionFinalRepository.create(condicionFinal);
  }

  @get('/condicion-final/count', {
    responses: {
      '200': {
        description: 'CondicionFinal model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CondicionFinal)) where?: Where<CondicionFinal>,
  ): Promise<Count> {
    return this.condicionFinalRepository.count(where);
  }

  @get('/condicion-final', {
    responses: {
      '200': {
        description: 'Array of CondicionFinal model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CondicionFinal, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CondicionFinal)) filter?: Filter<CondicionFinal>,
  ): Promise<CondicionFinal[]> {
    return this.condicionFinalRepository.find(filter);
  }

  @patch('/condicion-final', {
    responses: {
      '200': {
        description: 'CondicionFinal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CondicionFinal, {partial: true}),
        },
      },
    })
    condicionFinal: CondicionFinal,
    @param.query.object('where', getWhereSchemaFor(CondicionFinal)) where?: Where<CondicionFinal>,
  ): Promise<Count> {
    return this.condicionFinalRepository.updateAll(condicionFinal, where);
  }

  @get('/condicion-final/{id}', {
    responses: {
      '200': {
        description: 'CondicionFinal model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CondicionFinal, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(CondicionFinal)) filter?: Filter<CondicionFinal>
  ): Promise<CondicionFinal> {
    return this.condicionFinalRepository.findById(id, filter);
  }

  @patch('/condicion-final/{id}', {
    responses: {
      '204': {
        description: 'CondicionFinal PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CondicionFinal, {partial: true}),
        },
      },
    })
    condicionFinal: CondicionFinal,
  ): Promise<void> {
    await this.condicionFinalRepository.updateById(id, condicionFinal);
  }

  @put('/condicion-final/{id}', {
    responses: {
      '204': {
        description: 'CondicionFinal PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() condicionFinal: CondicionFinal,
  ): Promise<void> {
    await this.condicionFinalRepository.replaceById(id, condicionFinal);
  }

  @del('/condicion-final/{id}', {
    responses: {
      '204': {
        description: 'CondicionFinal DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.condicionFinalRepository.deleteById(id);
  }
}
