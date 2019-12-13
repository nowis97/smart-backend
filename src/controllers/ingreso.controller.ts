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
import {Ingresos, Neumaticos} from '../models';
import {IngresosRepository, NeumaticosRepository} from '../repositories';

export class IngresoController {
  constructor(
    @repository(IngresosRepository)
    public ingresosRepository : IngresosRepository,
    @repository(NeumaticosRepository)
    public neumaticosRepository: NeumaticosRepository
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
      if(!await this.neumaticosRepository.exists(ingresos.neumaticosserie))
            await this.neumaticosRepository.create(new Neumaticos(
              {serie: ingresos.neumaticosserie, estadoActual: 'INGRESADO'}
            ));

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
   //return this.ingresosRepository.execute('select ingresos.id,faena,guia_despacho,patente_camion,guia_kt,fecha,comentario from ingresos,clientes where ingresos.clientesid = clientes.id',[])
    return this.ingresosRepository.find(filter);
  }

  @get('/ingresados', {
    responses: {
      '200': {
        description: 'objetos of Ingresos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  })async todosIngresados():Promise<object>{
    return this
      .ingresosRepository
      .execute('select neumaticosserie,faena,guia_despacho,patente_camion,guia_kt,fecha,comentario,ruta_foto from ingresos,clientes where ingresos.clientesid = clientes.id', [])

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
