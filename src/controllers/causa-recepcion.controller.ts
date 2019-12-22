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
import {CausaRecepcion} from '../models';
import {CausaRecepcionRepository} from '../repositories';

export class CausaRecepcionController {
  constructor(
    @repository(CausaRecepcionRepository)
    public causaRecepcionRepository : CausaRecepcionRepository,
  ) {}

  @post('/causa-recepcion', {
    responses: {
      '200': {
        description: 'CausaRecepcion model instance',
        content: {'application/json': {schema: getModelSchemaRef(CausaRecepcion)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CausaRecepcion, {
            title: 'NewCausaRecepcion',
            exclude: ['id'],
          }),
        },
      },
    })
    causaRecepcion: Omit<CausaRecepcion, 'id'>,
  ): Promise<CausaRecepcion> {
    return this.causaRecepcionRepository.create(causaRecepcion);
  }

  @get('/causa-recepcion/count', {
    responses: {
      '200': {
        description: 'CausaRecepcion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CausaRecepcion)) where?: Where<CausaRecepcion>,
  ): Promise<Count> {
    return this.causaRecepcionRepository.count(where);
  }

  @get('/causa-recepcion', {
    responses: {
      '200': {
        description: 'Array of CausaRecepcion model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CausaRecepcion, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CausaRecepcion)) filter?: Filter<CausaRecepcion>,
  ): Promise<CausaRecepcion[]> {
    return this.causaRecepcionRepository.find(filter);
  }

  @patch('/causa-recepcion', {
    responses: {
      '200': {
        description: 'CausaRecepcion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CausaRecepcion, {partial: true}),
        },
      },
    })
    causaRecepcion: CausaRecepcion,
    @param.query.object('where', getWhereSchemaFor(CausaRecepcion)) where?: Where<CausaRecepcion>,
  ): Promise<Count> {
    return this.causaRecepcionRepository.updateAll(causaRecepcion, where);
  }

  @get('/causa-recepcion/{id}', {
    responses: {
      '200': {
        description: 'CausaRecepcion model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CausaRecepcion, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(CausaRecepcion)) filter?: Filter<CausaRecepcion>
  ): Promise<CausaRecepcion> {
    return this.causaRecepcionRepository.findById(id, filter);
  }

  @patch('/causa-recepcion/{id}', {
    responses: {
      '204': {
        description: 'CausaRecepcion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CausaRecepcion, {partial: true}),
        },
      },
    })
    causaRecepcion: CausaRecepcion,
  ): Promise<void> {
    await this.causaRecepcionRepository.updateById(id, causaRecepcion);
  }

  @put('/causa-recepcion/{id}', {
    responses: {
      '204': {
        description: 'CausaRecepcion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() causaRecepcion: CausaRecepcion,
  ): Promise<void> {
    await this.causaRecepcionRepository.replaceById(id, causaRecepcion);
  }

  @del('/causa-recepcion/{id}', {
    responses: {
      '204': {
        description: 'CausaRecepcion DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.causaRecepcionRepository.deleteById(id);
  }
}
