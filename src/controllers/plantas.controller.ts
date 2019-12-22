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
import {Planta} from '../models';
import {PlantaRepository} from '../repositories';

export class PlantasController {
  constructor(
    @repository(PlantaRepository)
    public plantaRepository : PlantaRepository,
  ) {}

  @post('/plantas', {
    responses: {
      '200': {
        description: 'Planta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Planta)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planta, {
            title: 'NewPlanta',
            exclude: ['id'],
          }),
        },
      },
    })
    planta: Omit<Planta, 'id'>,
  ): Promise<Planta> {
    return this.plantaRepository.create(planta);
  }

  @get('/plantas/count', {
    responses: {
      '200': {
        description: 'Planta model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Planta)) where?: Where<Planta>,
  ): Promise<Count> {
    return this.plantaRepository.count(where);
  }

  @get('/plantas', {
    responses: {
      '200': {
        description: 'Array of Planta model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Planta, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Planta)) filter?: Filter<Planta>,
  ): Promise<Planta[]> {
    return this.plantaRepository.find(filter);
  }

  @patch('/plantas', {
    responses: {
      '200': {
        description: 'Planta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planta, {partial: true}),
        },
      },
    })
    planta: Planta,
    @param.query.object('where', getWhereSchemaFor(Planta)) where?: Where<Planta>,
  ): Promise<Count> {
    return this.plantaRepository.updateAll(planta, where);
  }

  @get('/plantas/{id}', {
    responses: {
      '200': {
        description: 'Planta model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planta, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Planta)) filter?: Filter<Planta>
  ): Promise<Planta> {
    return this.plantaRepository.findById(id, filter);
  }

  @patch('/plantas/{id}', {
    responses: {
      '204': {
        description: 'Planta PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planta, {partial: true}),
        },
      },
    })
    planta: Planta,
  ): Promise<void> {
    await this.plantaRepository.updateById(id, planta);
  }

  @put('/plantas/{id}', {
    responses: {
      '204': {
        description: 'Planta PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() planta: Planta,
  ): Promise<void> {
    await this.plantaRepository.replaceById(id, planta);
  }

  @del('/plantas/{id}', {
    responses: {
      '204': {
        description: 'Planta DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.plantaRepository.deleteById(id);
  }
}
