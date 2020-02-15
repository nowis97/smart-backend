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
import {Neumaticos} from '../models';
import {NeumaticosRepository} from '../repositories';

export class NeumaticosController {
  constructor(
    @repository(NeumaticosRepository)
    public neumaticosRepository : NeumaticosRepository,
  ) {}

  @post('/neumaticos', {
    responses: {
      '200': {
        description: 'Neumaticos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Neumaticos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Neumaticos, {
            title: 'NewNeumaticos',
            
          }),
        },
      },
    })
    neumaticos: Neumaticos,
  ): Promise<Neumaticos> {
    return this.neumaticosRepository.create(neumaticos);
  }

  @get('/neumaticos/count', {
    responses: {
      '200': {
        description: 'Neumaticos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Neumaticos)) where?: Where<Neumaticos>,
  ): Promise<Count> {
    return this.neumaticosRepository.count(where);
  }

  @get('/neumaticos', {
    responses: {
      '200': {
        description: 'Array of Neumaticos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Neumaticos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Neumaticos)) filter?: Filter<Neumaticos>,
  ): Promise<Neumaticos[]> {
    return this.neumaticosRepository.find(filter);
  }

  @patch('/neumaticos', {
    responses: {
      '200': {
        description: 'Neumaticos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Neumaticos, {partial: true}),
        },
      },
    })
    neumaticos: Neumaticos,
    @param.query.object('where', getWhereSchemaFor(Neumaticos)) where?: Where<Neumaticos>,
  ): Promise<Count> {
    return this.neumaticosRepository.updateAll(neumaticos, where);
  }

  @get('/neumaticos/{id}', {
    responses: {
      '200': {
        description: 'Neumaticos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Neumaticos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Neumaticos)) filter?: Filter<Neumaticos>
  ): Promise<Neumaticos> {
    return this.neumaticosRepository.findById(id, filter);
  }

  @patch('/neumaticos/{id}', {
    responses: {
      '204': {
        description: 'Neumaticos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Neumaticos, {partial: true}),
        },
      },
    })
    neumaticos: Neumaticos,
  ): Promise<void> {
    await this.neumaticosRepository.updateById(id, neumaticos);
  }

  @put('/neumaticos/{id}', {
    responses: {
      '204': {
        description: 'Neumaticos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() neumaticos: Neumaticos,
  ): Promise<void> {
    await this.neumaticosRepository.replaceById(id, neumaticos);
  }

  @del('/neumaticos/{id}', {
    responses: {
      '204': {
        description: 'Neumaticos DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.neumaticosRepository.deleteById(id);
  }


}
