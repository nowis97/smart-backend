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
import {TipoMinas} from '../models';
import {TipoMinasRepository} from '../repositories';

export class TipoMinasController {
  constructor(
    @repository(TipoMinasRepository)
    public tipoMinasRepository : TipoMinasRepository,
  ) {}

  @post('/tipo-minas', {
    responses: {
      '200': {
        description: 'TipoMinas model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoMinas)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMinas, {
            title: 'NewTipoMinas',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoMinas: Omit<TipoMinas, 'id'>,
  ): Promise<TipoMinas> {
    return this.tipoMinasRepository.create(tipoMinas);
  }

  @get('/tipo-minas/count', {
    responses: {
      '200': {
        description: 'TipoMinas model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TipoMinas)) where?: Where<TipoMinas>,
  ): Promise<Count> {
    return this.tipoMinasRepository.count(where);
  }

  @get('/tipo-minas', {
    responses: {
      '200': {
        description: 'Array of TipoMinas model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TipoMinas, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TipoMinas)) filter?: Filter<TipoMinas>,
  ): Promise<TipoMinas[]> {
    return this.tipoMinasRepository.find(filter);
  }

  @patch('/tipo-minas', {
    responses: {
      '200': {
        description: 'TipoMinas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMinas, {partial: true}),
        },
      },
    })
    tipoMinas: TipoMinas,
    @param.query.object('where', getWhereSchemaFor(TipoMinas)) where?: Where<TipoMinas>,
  ): Promise<Count> {
    return this.tipoMinasRepository.updateAll(tipoMinas, where);
  }

  @get('/tipo-minas/{id}', {
    responses: {
      '200': {
        description: 'TipoMinas model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoMinas, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(TipoMinas)) filter?: Filter<TipoMinas>
  ): Promise<TipoMinas> {
    return this.tipoMinasRepository.findById(id, filter);
  }

  @patch('/tipo-minas/{id}', {
    responses: {
      '204': {
        description: 'TipoMinas PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMinas, {partial: true}),
        },
      },
    })
    tipoMinas: TipoMinas,
  ): Promise<void> {
    await this.tipoMinasRepository.updateById(id, tipoMinas);
  }

  @put('/tipo-minas/{id}', {
    responses: {
      '204': {
        description: 'TipoMinas PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoMinas: TipoMinas,
  ): Promise<void> {
    await this.tipoMinasRepository.replaceById(id, tipoMinas);
  }

  @del('/tipo-minas/{id}', {
    responses: {
      '204': {
        description: 'TipoMinas DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoMinasRepository.deleteById(id);
  }
}
