import {repository} from '@loopback/repository';
import {MapleRepository, NeumaticosRepository} from '../repositories';

import {get, getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {Maple} from '../models';

export class MapleController {
  constructor(
    @repository(MapleRepository)
    public mapleRepository: MapleRepository,
    @repository(NeumaticosRepository)
    public neumaticoRepository: NeumaticosRepository
  ) {
  }

  @get('/maple', {
    responses: {
      200: {
        description: 'Neumáticos para proceso maple',
        content: {'application/json': {schema: {}}}
      }
    }

  })
  async getMaple(): Promise<Object> {

    return this.mapleRepository.execute("SELECT\n" +
      "    p.renovadoid,\n" +
      "    n.serie,\n" +
      "    c.faena,\n" +
      "    c.tiene_contrato,\n" +
      "    n.estado_actual,\n" +
      "    f.numero_factura,\n" +
      "    f.fecha\n" +
      "FROM\n" +
      "    smart_web.dbo.procesos p\n" +
      "        INNER JOIN smart_web.dbo.trabajos t ON\n" +
      "            p.trabajosorden_trabajo = t.orden_trabajo\n" +
      "        INNER JOIN smart_web.dbo.recepciones r ON\n" +
      "            t.recepcionesid = r.id\n" +
      "        INNER JOIN smart_web.dbo.ingresos i ON\n" +
      "            r.ingresosid = i.id\n" +
      "        INNER JOIN smart_web.dbo.neumaticos n ON\n" +
      "            i.neumaticosserie = n.serie\n" +
      "        INNER JOIN smart_web.dbo.clientes c ON\n" +
      "            i.clientesid = c.id\n" +
      "        INNER JOIN smart_web.dbo.despachos d ON\n" +
      "            p.id = d.procesosid\n" +
      "        INNER JOIN smart_web.dbo.facturas f ON\n" +
      "            f.despachosguia_despacho = d.guia_despacho\n" +
      "WHERE\n" +
      "    p.renovadoid IS NOT NULL\n" +
      "  AND n.estado_actual = 'FACTURADO'", [])

  }

  @post('/maple',{
    responses:{
      200:{
        description: 'ingreso Maple',
        content:{'application/json':{schema: getModelSchemaRef(Maple)}}


      }
    }
  })
  async create(
    @requestBody({
      content:{
        'application/json': {
          schema:getModelSchemaRef(Maple)
        }
      }
    })
    maple: Maple
  ):Promise<Maple>{
    await this.neumaticoRepository.updateById(maple.serie,{estadoActual:'MAPLE'});
    return this.mapleRepository.create(maple);
  }

}




