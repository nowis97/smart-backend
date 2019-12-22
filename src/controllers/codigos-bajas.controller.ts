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
import {CodigosBajas} from '../models';
import {CodigosBajasRepository} from '../repositories';

export class CodigosBajasController {
  constructor(
    @repository(CodigosBajasRepository)
    public codigosBajasRepository : CodigosBajasRepository,
  ) {}

  @post('/codigos-bajas', {
    responses: {
      '200': {
        description: 'CodigosBajas model instance',
        content: {'application/json': {schema: getModelSchemaRef(CodigosBajas)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigosBajas, {
            title: 'NewCodigosBajas',
            
          }),
        },
      },
    })
    codigosBajas: CodigosBajas,
  ): Promise<CodigosBajas> {
    return this.codigosBajasRepository.create(codigosBajas);
  }

  @get('/codigos-bajas/count', {
    responses: {
      '200': {
        description: 'CodigosBajas model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CodigosBajas)) where?: Where<CodigosBajas>,
  ): Promise<Count> {
    return this.codigosBajasRepository.count(where);
  }

  @get('/codigos-bajas', {
    responses: {
      '200': {
        description: 'Array of CodigosBajas model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CodigosBajas, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CodigosBajas)) filter?: Filter<CodigosBajas>,
  ): Promise<CodigosBajas[]> {
    return this.codigosBajasRepository.find(filter);
  }

  @patch('/codigos-bajas', {
    responses: {
      '200': {
        description: 'CodigosBajas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigosBajas, {partial: true}),
        },
      },
    })
    codigosBajas: CodigosBajas,
    @param.query.object('where', getWhereSchemaFor(CodigosBajas)) where?: Where<CodigosBajas>,
  ): Promise<Count> {
    return this.codigosBajasRepository.updateAll(codigosBajas, where);
  }

  @get('/codigos-bajas/{id}', {
    responses: {
      '200': {
        description: 'CodigosBajas model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CodigosBajas, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(CodigosBajas)) filter?: Filter<CodigosBajas>
  ): Promise<CodigosBajas> {
    return this.codigosBajasRepository.findById(id, filter);
  }

  @patch('/codigos-bajas/{id}', {
    responses: {
      '204': {
        description: 'CodigosBajas PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigosBajas, {partial: true}),
        },
      },
    })
    codigosBajas: CodigosBajas,
  ): Promise<void> {
    await this.codigosBajasRepository.updateById(id, codigosBajas);
  }

  @put('/codigos-bajas/{id}', {
    responses: {
      '204': {
        description: 'CodigosBajas PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() codigosBajas: CodigosBajas,
  ): Promise<void> {
    await this.codigosBajasRepository.replaceById(id, codigosBajas);
  }

  @del('/codigos-bajas/{id}', {
    responses: {
      '204': {
        description: 'CodigosBajas DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.codigosBajasRepository.deleteById(id);
  }
}
