// @ts-nocheck
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
import {Correctiva, KalUltra, Preventiva, Procesos, Trabajos} from '../models';
import {
  TrabajosRepository,
  ProcesosRepository,
  RenovadoRepository,
  TipoRenovadoRepository,
  NeumaticosRepository,
  PreventivaRepository,
  KalUltraRepository,
  CorrectivaRepository,
  RecepcionesRepository
} from '../repositories';
import {secured, SecuredType} from '../auth';

export class TrabajosController {
  constructor(
    @repository(TrabajosRepository)
    public trabajosRepository : TrabajosRepository,
    @repository(ProcesosRepository)
    public procesosRepository : ProcesosRepository,
    @repository(RenovadoRepository)
    public renovadoRepository: RenovadoRepository,
    @repository(TipoRenovadoRepository)
    public tipoRenovadoRepository : TipoRenovadoRepository,
    @repository(NeumaticosRepository)
    public neumaticosRepository: NeumaticosRepository,
    @repository(PreventivaRepository)
    public preventivaRepository : PreventivaRepository,
    @repository(KalUltraRepository)
    public kalUltraRepository : KalUltraRepository,
    @repository(CorrectivaRepository)
    public correctivaRepository: CorrectivaRepository,
    @repository(RecepcionesRepository)
    public recepcionesRepository: RecepcionesRepository
  ) {}

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','planta'])
  @post('/trabajos', {
    responses: {
      '200': {
        description: 'Trabajos model instance',
        content: {'application/json': {schema: {}}},
      },
    },
  })
  //@ts-nocheck
   async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {},
        },
      },
    })
    trabajo: Object,
  ): Promise<Object> {

  if (await this.trabajosRepository.exists(trabajo.planta.ordenTrabajo))
    throw new HttpErrors.Conflict('La orden de trabajo ya existe');

   const recepcionado = await this.recepcionesRepository.findById(trabajo.planta.recepcionesid);

   if (new Date(trabajo.planta.fechaProduccion).getTime() < new Date(recepcionado.fecha).getTime() )
     throw new HttpErrors.BadRequest('La fecha de producción debe ser mayor que la de recepción');

    if (Object.keys(trabajo).length ===1){
      delete trabajo.planta.garantia;
      await this.neumaticosRepository.updateById(trabajo.planta.serie,{estadoActual:'BAJA'});
      delete trabajo.planta.serie;
      return this.trabajosRepository.create(trabajo.planta);
    }
    const garantia = trabajo.planta.garantia;
    const serie = trabajo.planta.serie;
    delete trabajo.planta.garantia;
    delete trabajo.planta.serie;
    await this.trabajosRepository.create(trabajo.planta);

    if (trabajo.renovados){

      let tipoRenovadoId = {};
      if (trabajo.renovados.tipoRenovado ==='ultratread') {
        tipoRenovadoId = (await this.tipoRenovadoRepository.findOne({where: {nombre: 'Ultra Tread'}}))?.id;
      }else{
        tipoRenovadoId = (await this.tipoRenovadoRepository.findOne({where:{nombre:'Smooth and Groove'}}))?.id;
      }
      // eslint-disable-next-line require-atomic-updates
      trabajo.renovados.tipoRenovadoid= tipoRenovadoId;

      delete trabajo.renovados.tipoRenovado;


     const newRenovado = await this.renovadoRepository.create(trabajo.renovados);

     await this.neumaticosRepository.updateById(serie,{estadoActual:'TERMINADO'});
     return this.procesosRepository.create(new Procesos({'garantia':garantia,'trabajosordenTrabajo':trabajo.planta.ordenTrabajo,'renovadoid':newRenovado.id}));

    }else{
      let preventiva =null;
      let correctiva =null;
      let kalUltra = null;
      if (trabajo.initialStateForms.preventiva) preventiva = await this.preventivaRepository.create(
        new Preventiva(trabajo.reparaciones.preventiva)
      );

      if(trabajo.initialStateForms.correctiva) correctiva = await this.correctivaRepository.create(
        new Correctiva(trabajo.reparaciones.reparacionCorrectiva
      ));

      if (trabajo.initialStateForms.kalUltra) kalUltra = await this.kalUltraRepository.create(
        new KalUltra(trabajo.reparaciones.reparacionKalUltra)
      );

      await this.neumaticosRepository.updateById(serie,{estadoActual:'TERMINADO'});

      return this.procesosRepository.create(
        new Procesos({
          'garantia':garantia,
          'kalUltraid':kalUltra? kalUltra.id:null,
          'correctivaid':correctiva ? correctiva.id:null,
          'preventivaid':preventiva ? preventiva.id:null,
          'trabajosordenTrabajo':trabajo.planta.ordenTrabajo
        })
      )

    }






  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','planta','despacho'])

  @get('/trabajados',{
    responses:{
      200:{
        description:'Neumaticos listos para despachar'
      }
    }
  })
  async trabajados():Promise<Object>{
    return this.trabajosRepository.execute('select procesos.id, neumaticos.serie, clientes.faena, trabajos.orden_trabajo,trabajos.fecha_produccion,condicion_final.nombre,procesos.garantia,ruta_foto from procesos,trabajos,condicion_final,recepciones,ingresos,neumaticos,causa_recepcion,clientes\n' +
      'where procesos.trabajosorden_trabajo = trabajos.orden_trabajo and trabajos.condicion_finalid = condicion_final.id and trabajos.recepcionesid = recepciones.id and recepciones.causa_recepcionid = causa_recepcion.id and\n' +
      '      recepciones.ingresosid = ingresos.id and ingresos.clientesid = clientes.id and  ingresos.neumaticosserie = neumaticos.serie and (estado_actual = \'BAJA\' OR estado_actual = \'TERMINADO\')')


  }

  @get('/trabajos/count', {
    responses: {
      '200': {
        description: 'Trabajos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Trabajos)) where?: Where<Trabajos>,
  ): Promise<Count> {
    return this.trabajosRepository.count(where);
  }


  @get('/trabajos', {
    responses: {
      '200': {
        description: 'Array of Trabajos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Trabajos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Trabajos)) filter?: Filter<Trabajos>,
  ): Promise<Trabajos[]> {
    return this.trabajosRepository.find(filter);
  }

  @patch('/trabajos', {
    responses: {
      '200': {
        description: 'Trabajos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trabajos, {partial: true}),
        },
      },
    })
    trabajos: Trabajos,
    @param.query.object('where', getWhereSchemaFor(Trabajos)) where?: Where<Trabajos>,
  ): Promise<Count> {
    return this.trabajosRepository.updateAll(trabajos, where);
  }

  @get('/trabajos/{id}', {
    responses: {
      '200': {
        description: 'Trabajos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Trabajos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Trabajos)) filter?: Filter<Trabajos>
  ): Promise<Trabajos> {
    return this.trabajosRepository.findById(id, filter);
  }

  @patch('/trabajos/{id}', {
    responses: {
      '204': {
        description: 'Trabajos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trabajos, {partial: true}),
        },
      },
    })
    trabajos: Trabajos,
  ): Promise<void> {
    await this.trabajosRepository.updateById(id, trabajos);
  }

  @put('/trabajos/{id}', {
    responses: {
      '204': {
        description: 'Trabajos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() trabajos: Trabajos,
  ): Promise<void> {
    await this.trabajosRepository.replaceById(id, trabajos);
  }

  @del('/trabajos/{id}', {
    responses: {
      '204': {
        description: 'Trabajos DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.trabajosRepository.deleteById(id);
  }
}
