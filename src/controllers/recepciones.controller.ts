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
  HttpErrors
} from '@loopback/rest';
import {Recepciones} from '../models';
import {RecepcionesRepository, TireRepository} from '../repositories';
import {NeumaticosRepository} from '../repositories';
import {IngresosRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class RecepcionesController {
  constructor(
    @repository(RecepcionesRepository)
    public recepcionesRepository : RecepcionesRepository,
    @repository(NeumaticosRepository)
    public neumaticosRepository:NeumaticosRepository,
    @repository(IngresosRepository)
    public ingresosRepository : IngresosRepository,
    @repository(TireRepository)
    public tireRepository : TireRepository
  ) {}
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @post('/recepciones', {
    responses: {
      '200': {
        description: 'Recepciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recepciones)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepciones, {
            title: 'NewRecepciones',
            exclude: ['id'],
          }),
        },
      },
    })
    recepciones: Omit<Recepciones, 'id'>,
  ): Promise<Recepciones> {
    const ingreso = await this.ingresosRepository.findById(recepciones.ingresosid);

    if ((new Date(recepciones.fecha)).getTime() <= (new Date(ingreso.fecha)).getTime() )
      throw new HttpErrors.BadRequest('Las fecha de recepcion debe ser mayor que la fecha de ingreso');


    const resp =await this.recepcionesRepository.create(recepciones);
    await this.neumaticosRepository.updateById(ingreso.neumaticosserie,{estadoActual:'RECEPCIONADO'});
    return resp

  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @get('/recepciones/count', {
    responses: {
      '200': {
        description: 'Recepciones model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Recepciones)) where?: Where<Recepciones>,
  ): Promise<Count> {
    return this.recepcionesRepository.count(where);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @get('/recepcionados/toms/{serie}',{
    responses:{
      200:{
        description: 'object of neumatico in TOMS ',
        content:{
          'application/json':{
          }
        }
      },
    }
  })async getNeumaticoToms(@param.path.string('serie') serie:string){
    return this.tireRepository.find({where:{casingSerialNo:serie}});

  }


  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion','planta'])
  @get('/recepcionados',{
    responses:{
      200:{
        description: 'Array of recepcion with' +
          ' state recepcionados according state neumatico',
        content:{
          'application/json':{

          }
        }
      },
    }
  })async getRecepcionados(){
    return this.recepcionesRepository.execute('select recepciones.id,clientes.faena, neumaticos.serie, ingresos.guia_despacho,\n' +
      '       kms_operacion,hrs_operacion,rtd,recepciones.fecha,causa_recepcion.nombre, ingresos.ruta_foto\n' +
      '       from recepciones,ingresos,causa_recepcion,clientes, neumaticos where\n' +
      '        recepciones.causa_recepcionid = causa_recepcion.id\n' +
      '        and recepciones.ingresosid = ingresos.id\n' +
      '        and ingresos.clientesid = clientes.id\n' +
      '        AND ingresos.neumaticosserie = neumaticos.serie\n' +
      '        AND neumaticos.estado_actual = \'RECEPCIONADO\'\n',[])
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @get('/recepciones', {
    responses: {
      '200': {
        description: 'Array of Recepciones model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Recepciones, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Recepciones)) filter?: Filter<Recepciones>,
  ): Promise<Recepciones[]> {
    return this.recepcionesRepository.find(filter);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @patch('/recepciones', {
    responses: {
      '200': {
        description: 'Recepciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepciones, {partial: true}),
        },
      },
    })
    recepciones: Recepciones,
    @param.query.object('where', getWhereSchemaFor(Recepciones)) where?: Where<Recepciones>,
  ): Promise<Count> {
    return this.recepcionesRepository.updateAll(recepciones, where);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @get('/recepciones/{id}', {
    responses: {
      '200': {
        description: 'Recepciones model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Recepciones, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Recepciones)) filter?: Filter<Recepciones>
  ): Promise<Recepciones> {
    return this.recepcionesRepository.findById(id, filter);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @patch('/recepciones/{id}', {
    responses: {
      '204': {
        description: 'Recepciones PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepciones, {partial: true}),
        },
      },
    })
    recepciones: Recepciones,
  ): Promise<void> {
    await this.recepcionesRepository.updateById(id, recepciones);
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @put('/recepciones/{id}', {
    responses: {
      '204': {
        description: 'Recepciones PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recepciones: Recepciones,
  ): Promise<void> {
    await this.recepcionesRepository.replaceById(id, recepciones);
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','recepcion'])
  @del('/recepciones/{id}', {
    responses: {
      '204': {
        description: 'Recepciones DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recepcionesRepository.deleteById(id);
  }
}
