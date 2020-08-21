// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/context';
import {
  param,
  get,
  RestBindings, Response,
} from '@loopback/rest';

import * as cp from 'child_process'
import fs from 'fs';
import path from 'path';
import {repository} from '@loopback/repository';
import {ClientesRepository, FacturasRepository} from '../repositories';
import {secured, SecuredType} from '../auth';



export class ReportesController {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @repository(FacturasRepository) private facturasRepository: FacturasRepository,
    @repository(ClientesRepository) private clienteRepository: ClientesRepository
  ) {
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','reportes'])
  @get('/reportes/export/maple',{
      responses: {
        200: {
          description: 'Reporte maple a la fecha',
          content: {'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {schema: {type: 'string'}}}
        }
      }
    }
  )
  async reporteMaple(@param.query.dateTime('fechaInicio', {required: true}) fechaInicio: Date,
                     @param.query.dateTime('fechaTermino', {required: true}) fechaTermino: Date,
                     @param.query.string('faena', {required: true}) faena: string) {


    const FILENAME_TEMPLATE = 'ReporteMapleTemplate.xlsx';
    const FILENAME_REPORT = 'ReporteMaple.xlsx';
    const FILENAME_EXCEL = 'SMART_Excel';

    const pathReport =  path.resolve('assets/'+FILENAME_REPORT);
    const pathSmartExcel =path.resolve('src/SMART_EXCEL_EXPORT/'+FILENAME_EXCEL);

    const pathTemplate = path.resolve('assets/'+FILENAME_TEMPLATE);

    let nombreCliente ='Todos';
    let reporteRows;

    if (faena !=='0') {
      nombreCliente = (await this.clienteRepository.findById(parseInt(faena))).faena;

      reporteRows = await this.facturasRepository.execute("select neumaticos.serie, catalogo.manufacturer,trabajos.orden_trabajo,trabajos.fecha_produccion,facturas.numero_factura,facturas.fecha,maple.cod_producto,\n" +
        "       maple.nombre_producto,renovado.peso_carcasa,maple.ahorro_emisiones_co2,maple.ahorro_co2,maple.ahorro_diesel\n" +
        "from neumaticos,catalogo,trabajos,facturas,despachos,procesos,ingresos,recepciones,maple,renovado\n" +
        "where facturas.despachosguia_despacho = despachos.guia_despacho and despachos.procesosid = procesos.id\n" +
        "  and procesos.trabajosorden_trabajo = trabajos.orden_trabajo and trabajos.recepcionesid = recepciones.id and\n" +
        "      recepciones.ingresosid = ingresos.id and recepciones.ingresosid = ingresos.id and ingresos.neumaticosserie = neumaticos.serie and\n" +
        "      neumaticos.catalogocatalogue_number = catalogo.catalogue_number and neumaticos.serie = maple.serie and procesos.renovadoid = renovado.id\n" +
        "        and ingresos.clientesid = (?) and facturas.fecha between (?) and (?) ", [faena, fechaInicio, fechaTermino]);

    }else {

      reporteRows = await this.facturasRepository.execute("select neumaticos.serie, catalogo.manufacturer,trabajos.orden_trabajo,trabajos.fecha_produccion,facturas.numero_factura,facturas.fecha,maple.cod_producto,\n" +
        "       maple.nombre_producto,renovado.peso_carcasa,maple.ahorro_emisiones_co2,maple.ahorro_co2,maple.ahorro_diesel\n" +
        "from neumaticos,catalogo,trabajos,facturas,despachos,procesos,ingresos,recepciones,maple,renovado\n" +
        "where facturas.despachosguia_despacho = despachos.guia_despacho and despachos.procesosid = procesos.id\n" +
        "  and procesos.trabajosorden_trabajo = trabajos.orden_trabajo and trabajos.recepcionesid = recepciones.id and\n" +
        "      recepciones.ingresosid = ingresos.id and recepciones.ingresosid = ingresos.id and ingresos.neumaticosserie = neumaticos.serie and\n" +
        "      neumaticos.catalogocatalogue_number = catalogo.catalogue_number and neumaticos.serie = maple.serie and procesos.renovadoid = renovado.id\n" +
        "      and facturas.fecha between (?) and (?) ", [fechaInicio, fechaTermino]);
    }

    if (fs.existsSync(pathReport))
      fs.unlinkSync(pathReport);

    const res = cp.spawnSync(pathSmartExcel, [
      pathTemplate.toString(),
      pathReport.toString(),
      nombreCliente,
      fechaInicio.toLocaleDateString(),
      fechaTermino.toLocaleDateString(),
      JSON.stringify(reporteRows)
    ]);


    const stream = fs.readFileSync(pathReport);


    console.log(res.stdout.toString());

    this.response.status(200)
      .contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .attachment('ReporteMaple.xlsx')
      .send(stream);

  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','reportes'])
  @get('/reportes/maple', {
      responses: {
        200: {
          description: 'Reporte maple a la fecha',
          content: {'application/json': {schema: {type: 'object'}}}
        }
      }
    }
  )
  async maple(@param.query.dateTime('fechaInicio', {required: true}) fechaInicio: Date,
              @param.query.dateTime('fechaTermino', {required: true}) fechaTermino: Date,
              @param.query.number('faena', {required: true}) faena: number) {
  let res = null;
    if (faena === 0) {
      res = await this.facturasRepository.execute("select 'Serie'= neumaticos.serie, 'Marca'= catalogo.manufacturer, '#Orden Trabajo' = trabajos.orden_trabajo, 'Fecha Produccion'= FORMAT(trabajos.fecha_produccion,'yyyy-MM-dd')," +
        " '#Factura'= facturas.numero_factura,'Fecha Factura'= FORMAT(facturas.fecha,'yyyy-MM-dd'),'Cod Producto' = maple.cod_producto,\n" +
        "      'Nombre Producto' = maple.nombre_producto ,'Peso Carcasa' =renovado.peso_carcasa,'Ahorro Emisiones CO2 (%)'= FORMAT( maple.ahorro_emisiones_co2,'P'), 'Ahorro Emisiones (Kgs)' = maple.ahorro_co2, 'Litros Diesel' = maple.ahorro_diesel\n" +
        "from neumaticos,catalogo,trabajos,facturas,despachos,procesos,ingresos,recepciones,maple,renovado\n" +
        "where facturas.despachosguia_despacho = despachos.guia_despacho and despachos.procesosid = procesos.id\n" +
        "  and procesos.trabajosorden_trabajo = trabajos.orden_trabajo and trabajos.recepcionesid = recepciones.id and\n" +
        "      recepciones.ingresosid = ingresos.id and recepciones.ingresosid = ingresos.id and ingresos.neumaticosserie = neumaticos.serie and\n" +
        "      neumaticos.catalogocatalogue_number = catalogo.catalogue_number and neumaticos.serie = maple.serie and procesos.renovadoid = renovado.id\n" +
        "         and facturas.fecha between (?) and (?) ", [fechaInicio,fechaTermino]);
    }else {
      res = await this.facturasRepository.execute("select 'Serie'= neumaticos.serie, 'Marca'= catalogo.manufacturer, '#Orden Trabajo' = trabajos.orden_trabajo, 'Fecha Produccion'= FORMAT(trabajos.fecha_produccion,'yyyy-MM-dd')," +
        " '#Factura'= facturas.numero_factura,'Fecha Factura'= FORMAT(facturas.fecha,'yyyy-MM-dd'),'Cod Producto' = maple.cod_producto,\n" +
        "      'Nombre Producto' = maple.nombre_producto ,'Peso Carcasa' =renovado.peso_carcasa,'Ahorro Emisiones CO2 (%)'= FORMAT( maple.ahorro_emisiones_co2,'P'), 'Ahorro Emisiones (Kgs)' = maple.ahorro_co2, 'Litros Diesel' = maple.ahorro_diesel\n" +
        "from neumaticos,catalogo,trabajos,facturas,despachos,procesos,ingresos,recepciones,maple,renovado\n" +
        "where facturas.despachosguia_despacho = despachos.guia_despacho and despachos.procesosid = procesos.id\n" +
        "  and procesos.trabajosorden_trabajo = trabajos.orden_trabajo and trabajos.recepcionesid = recepciones.id and\n" +
        "      recepciones.ingresosid = ingresos.id and recepciones.ingresosid = ingresos.id and ingresos.neumaticosserie = neumaticos.serie and\n" +
        "      neumaticos.catalogocatalogue_number = catalogo.catalogue_number and neumaticos.serie = maple.serie and procesos.renovadoid = renovado.id\n" +
        "        and ingresos.clientesid = (?) and facturas.fecha between (?) and (?) ", [faena, fechaInicio, fechaTermino]);
    }

    return res;
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','reportes'])
  @get('/reportes/ingresos', {
    responses: {
      200: {
        description: 'Reporte ingresos entre fechas',
        content: {'application/json': {schema: {type: 'string'}}}
      }
    }
  })
  async ingresos(@param.query.dateTime('fechaInicio', {required: true}) fechaInicio: Date,
                 @param.query.dateTime('fechaTermino', {required: true}) fechaTermino: Date,
                 @param.query.number('faena', {required: true}) faena: number) {
  if (faena === 0)
    return this.facturasRepository.execute("select 'Serie' = serie, 'Fecha Ingreso' = FORMAT(fecha,'yyyy-MM-dd'),'Guia Despacho'= guia_despacho, 'Patente Camion' = patente_camion , 'Guia KalTire' = IIF(guia_kt = 0, 'NO', 'SI'), 'Comentario' = comentario,\n" +
      "       'Cliente' = clientes.faena,'Compania' = compania, 'Tiene Contrato'= iif(guia_kt =0,'NO','SI'),'#Catalogo'=catalogue_number, 'Fabricante' = manufacturer,'Medida'= size\n" +
      "\n" +
      "from ingresos,clientes,neumaticos,catalogo\n" +
      "where ingresos.clientesid = clientes.id and ingresos.neumaticosserie = neumaticos.serie and neumaticos.catalogocatalogue_number = catalogo.catalogue_number and " +
      "ingresos.fecha between (?) and (?)", [fechaInicio, fechaTermino]);

    return this.facturasRepository.execute("select 'Serie' = serie, 'Fecha Ingreso' = FORMAT(fecha,'yyyy-MM-dd'),'Guia Despacho'= guia_despacho, 'Patente Camion' = patente_camion , 'Guia KalTire' = IIF(guia_kt = 0, 'NO', 'SI'), 'Comentario' = comentario,\n" +
      "       'Cliente' = clientes.faena,'Compania' = compania, 'Tiene Contrato'= iif(guia_kt =0,'NO','SI'),'#Catalogo'=catalogue_number, 'Fabricante' = manufacturer,'Medida'= size\n" +
      "\n" +
      "from ingresos,clientes,neumaticos,catalogo\n" +
      "where ingresos.clientesid = clientes.id and ingresos.neumaticosserie = neumaticos.serie and neumaticos.catalogocatalogue_number = catalogo.catalogue_number and " +
      "ingresos.fecha between (?) and (?) and clientes.id = (?)", [fechaInicio, fechaTermino, faena])
  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','reportes'])
  @get('/reportes/recepcionados', {
    responses: {
      200: {
        description: 'Reporte recepcionados entre fechas',
        content: {'application/json': {schema: {type: 'string'}}}
      }
    }
  })
  async recepcionados(@param.query.dateTime('fechaInicio', {required: true}) fechaInicio: Date,
                      @param.query.dateTime('fechaTermino', {required: true}) fechaTermino: Date,
                      @param.query.number('faena', {required: true}) faena: number) {

    if (faena===0)
      return this.facturasRepository.execute("select 'Serie'= neumaticos.serie,'Cliente'= clientes.faena, 'Guia despacho' = ingresos.guia_despacho,\n" +
        "       'Kms Operacion' = kms_operacion,'Hrs Operacion'= hrs_operacion, 'RTD' = rtd, 'Fecha Recepcion' = FORMAT(recepciones.fecha,'yyyy-MM-dd'), 'Causa Recepcion' = causa_recepcion.nombre, 'Guia KalTire' = IIF(guia_kt = 0, 'NO', 'SI')\n" +
        "       from recepciones,ingresos,causa_recepcion,clientes, neumaticos where\n" +
        "        recepciones.ingresosid = ingresos.id\n" +
        "        and recepciones.causa_recepcionid = causa_recepcion.id\n" +
        "        and ingresos.clientesid = clientes.id\n" +
        "        AND ingresos.neumaticosserie = neumaticos.serie and recepciones.fecha between (?) and (?)", [fechaInicio, fechaTermino]);


    return this.facturasRepository.execute("select 'Serie'= neumaticos.serie,'Cliente'= clientes.faena, 'Guia despacho' = ingresos.guia_despacho,\n" +
      "       'Kms Operacion' = kms_operacion,'Hrs Operacion'= hrs_operacion, 'RTD' = rtd, 'Fecha Recepcion' = FORMAT(recepciones.fecha,'yyyy-MM-dd'), 'Causa Recepcion' = causa_recepcion.nombre, 'Guia KalTire' = IIF(guia_kt = 0, 'NO', 'SI')\n" +
      "       from recepciones,ingresos,causa_recepcion,clientes, neumaticos where\n" +
      "        recepciones.ingresosid = ingresos.id\n" +
      "        and recepciones.causa_recepcionid = causa_recepcion.id\n" +
      "        and ingresos.clientesid = clientes.id\n" +
      "        AND ingresos.neumaticosserie = neumaticos.serie and recepciones.fecha between (?) and (?) and clientes.id = (?)", [fechaInicio, fechaTermino, faena])


  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','reportes'])
  @get('/reportes/planta', {
    responses: {
      200: {
        description: 'Reporte planta entre fechas',
        content: {'application/json': {schema: {type: 'string'}}}
      }
    }
  })
  async planta(@param.query.dateTime('fechaInicio', {required: true}) fechaInicio: Date,
               @param.query.dateTime('fechaTermino', {required: true}) fechaTermino: Date,
               @param.query.number('faena', {required: true}) faena: number) {

    if (faena === 0)
      return this.facturasRepository.execute("" +
        "SELECT\n" +
        "    'Proceso ID' = p.id,\n" +
        "     'Garantia' = iif(p.garantia=0,'NO','SI'),\n" +
        "    'Orden Trabajo' = p.trabajosorden_trabajo,\n" +
        "     'Prev Banda Rodado (111)' =LTRIM(STR(p2.banda_rodado)),\n" +
        "    'Prev Banda Lateral (112)' =LTRIM(STR(p2.banda_lateral)),\n" +
        "    'Prev Hombro (113)' = p2.hombro,\n" +
        "    'Prev Talon (116)' = p2.talon,\n" +
        "    'Prev Butilo (118)' = p2.butilo,\n" +
        "    'KU Banda Rodado (131)' = ku.banda_rodado,\n" +
        "    'KU Banda Lateral (132)' = ku.banda_lateral,\n" +
        "    'KU Hombro (133)' = ku.hombro,\n" +
        "    'Corr Banda Rodado (121)' = c.banda_rodado,\n" +
        "    'Corr Banda Lateral (122)' = c.banda_lateral,\n" +
        "    'Corr Hombro (123)' = c.hombro,\n" +
        "    'Corr Talon (126)' = c.talon,\n" +
        "    'Ren Cod Caucho Banda 2' = r.codigo_caucho_banda_2,\n" +
        "     'Ren Cod Caucho Banda' = r.codigo_caucho_banda,\n" +
        "    'Ren Peso Carcasa' = r.peso_carcasa,\n" +
        "    'Ren OTD' = r.otd_renovado,\n" +
        "     'Ren Caucho Utilizado' = r.caucho_utilizado,\n" +
        "    'Ren Cod. Caucho Base' = r.codigo_caucho_base,\n" +
        "    'Tipo Renovado' =tr.nombre,\n" +
        "    'Serie' = i.neumaticosserie,\n" +
        "    'Guia KalTire' =IIF(i.guia_kt=0,'NO','SI'),\n" +
        "    'Cliente' = c2.faena\n" +
        "FROM\n" +
        "    smart_cl.dbo.procesos p\n" +
        "        LEFT JOIN smart_cl.dbo.preventiva p2 ON\n" +
        "            p.preventivaid = p2.id\n" +
        "        LEFT JOIN smart_cl.dbo.kal_ultra ku ON\n" +
        "            p.kal_ultraid = ku.id\n" +
        "        LEFT JOIN smart_cl.dbo.correctiva c ON\n" +
        "            p.correctivaid = c.id\n" +
        "        LEFT JOIN smart_cl.dbo.renovado r ON\n" +
        "            p.renovadoid = r.id\n" +
        "        LEFT JOIN smart_cl.dbo.tipo_renovado tr ON\n" +
        "            r.tipo_renovadoid = tr.id\n" +
        "        INNER JOIN smart_cl.dbo.trabajos t ON\n" +
        "            p.trabajosorden_trabajo = t.orden_trabajo\n" +
        "        INNER JOIN smart_cl.dbo.recepciones r2 ON\n" +
        "            t.recepcionesid = r2.id\n" +
        "        INNER JOIN smart_cl.dbo.ingresos i ON\n" +
        "            r2.ingresosid = i.id\n" +
        "        INNER JOIN smart_cl.dbo.clientes c2 ON\n" +
        "            i.clientesid = c2.id where fecha_produccion between (?) and (?)", [fechaInicio, fechaTermino]);


    return this.facturasRepository.execute("" +
      "SELECT\n" +
      "    'Proceso ID' = p.id,\n" +
      "     'Garantia' = iif(p.garantia=0,'NO','SI'),\n" +
      "    'Orden Trabajo' = p.trabajosorden_trabajo,\n" +
      "     'Prev Banda Rodado (111)' =LTRIM(STR(p2.banda_rodado)),\n" +
      "    'Prev Banda Lateral (112)' =LTRIM(STR(p2.banda_lateral)),\n" +
      "    'Prev Hombro (113)' = p2.hombro,\n" +
      "    'Prev Talon (116)' = p2.talon,\n" +
      "    'Prev Butilo (118)' = p2.butilo,\n" +
      "    'KU Banda Rodado (131)' = ku.banda_rodado,\n" +
      "    'KU Banda Lateral (132)' = ku.banda_lateral,\n" +
      "    'KU Hombro (133)' = ku.hombro,\n" +
      "    'Corr Banda Rodado (121)' = c.banda_rodado,\n" +
      "    'Corr Banda Lateral (122)' = c.banda_lateral,\n" +
      "    'Corr Hombro (123)' = c.hombro,\n" +
      "    'Corr Talon (126)' = c.talon,\n" +
      "    'Ren Cod Caucho Banda 2' = r.codigo_caucho_banda_2,\n" +
      "     'Ren Cod Caucho Banda' = r.codigo_caucho_banda,\n" +
      "    'Ren Peso Carcasa' = r.peso_carcasa,\n" +
      "    'Ren OTD' = r.otd_renovado,\n" +
      "     'Ren Caucho Utilizado' = r.caucho_utilizado,\n" +
      "    'Ren Cod. Caucho Base' = r.codigo_caucho_base,\n" +
      "    'Tipo Renovado' =tr.nombre,\n" +
      "    'Serie' = i.neumaticosserie,\n" +
      "    'Guia KalTire' =IIF(i.guia_kt=0,'NO','SI'),\n" +
      "    'Cliente' = c2.faena\n" +
      "FROM\n" +
      "    smart_cl.dbo.procesos p\n" +
      "        LEFT JOIN smart_cl.dbo.preventiva p2 ON\n" +
      "            p.preventivaid = p2.id\n" +
      "        LEFT JOIN smart_cl.dbo.kal_ultra ku ON\n" +
      "            p.kal_ultraid = ku.id\n" +
      "        LEFT JOIN smart_cl.dbo.correctiva c ON\n" +
      "            p.correctivaid = c.id\n" +
      "        LEFT JOIN smart_cl.dbo.renovado r ON\n" +
      "            p.renovadoid = r.id\n" +
      "        LEFT JOIN smart_cl.dbo.tipo_renovado tr ON\n" +
      "            r.tipo_renovadoid = tr.id\n" +
      "        INNER JOIN smart_cl.dbo.trabajos t ON\n" +
      "            p.trabajosorden_trabajo = t.orden_trabajo\n" +
      "        INNER JOIN smart_cl.dbo.recepciones r2 ON\n" +
      "            t.recepcionesid = r2.id\n" +
      "        INNER JOIN smart_cl.dbo.ingresos i ON\n" +
      "            r2.ingresosid = i.id\n" +
      "        INNER JOIN smart_cl.dbo.clientes c2 ON\n" +
      "            i.clientesid = c2.id where fecha_produccion between (?) and (?) and clientesid = (?)", [fechaInicio, fechaTermino, faena])

  }

  @secured(SecuredType.HAS_ANY_ROLE,['superuser','reportes'])
  @get('/reportes/despachados', {
    responses: {
      200: {
        description: 'Reporte despachos entre fechas',
        content: {'application/json': {schema: {type: 'string'}}}
      }
    }
  })
  async despachados(@param.query.dateTime('fechaInicio', {required: true}) fechaInicio: Date,
                    @param.query.dateTime('fechaTermino', {required: true}) fechaTermino: Date,
                    @param.query.number('faena', {required: true}) faena: number) {

    if(faena === 0)
      return this.facturasRepository.execute("select 'Serie' = neumaticos.serie,'Cliente' = clientes.faena,'Guia Despacho'=despachos.guia_despacho,'Garantia' = iif(procesos.garantia=0,'NO','SI'),\n" +
        "      'Fecha Despacho' = FORMAT(despachos.fecha,'yyyy-MM-dd'), 'Patente Camion'= despachos.patente_camion, 'Orden Trabajo' = orden_trabajo, 'Fecha Produccion' = FORMAT(fecha_produccion,'yyyy-MM-dd')\n" +
        "from despachos,procesos, trabajos,recepciones,ingresos,neumaticos,clientes\n" +
        "where despachos.procesosid = procesos.id and procesos.trabajosorden_trabajo = trabajos.orden_trabajo  and trabajos.recepcionesid = recepciones.id\n" +
        "and recepciones.ingresosid = ingresos.id and ingresos.neumaticosserie = neumaticos.serie and ingresos.clientesid = clientes.id and despachos.fecha between (?) and (?)",
        [fechaInicio, fechaTermino]);


    return this.facturasRepository.execute("select 'Serie' = neumaticos.serie,'Cliente' = clientes.faena,'Guia Despacho'=despachos.guia_despacho,'Garantia' = iif(procesos.garantia=0,'NO','SI'),\n" +
      "      'Fecha Despacho' = FORMAT(despachos.fecha,'yyyy-MM-dd'), 'Patente Camion'= despachos.patente_camion, 'Orden Trabajo' = orden_trabajo, 'Fecha Produccion' = FORMAT(fecha_produccion,'yyyy-MM-dd')\n" +
      "from despachos,procesos, trabajos,recepciones,ingresos,neumaticos,clientes\n" +
      "where despachos.procesosid = procesos.id and procesos.trabajosorden_trabajo = trabajos.orden_trabajo  and trabajos.recepcionesid = recepciones.id\n" +
      "and recepciones.ingresosid = ingresos.id and ingresos.neumaticosserie = neumaticos.serie and ingresos.clientesid = clientes.id and despachos.fecha between (?) and (?) and clientes.id = (?)",
      [fechaInicio, fechaTermino,faena]);
  }


  @secured(SecuredType.HAS_ANY_ROLE,['superuser','reportes'])
  @get('/reportes/facturados', {
    responses: {
      200: {
        description: 'Reporte facturados entre fechas',
        content: {'application/json': {schema: {type: 'string'}}}
      }
    }
  })
  async facturados(@param.query.dateTime('fechaInicio',{required:true}) fechaInicio: Date,
                   @param.query.dateTime('fechaTermino',{required:true}) fechaTermino: Date,
                   @param.query.number('faena',{required:true}) faena: number) {

    if (faena === 0)
    return this.facturasRepository.execute("select 'Serie' = ingresos.neumaticosserie, 'Orden Trabajo'= trabajos.orden_trabajo, 'Fecha Produccion'= FORMAT(trabajos.fecha_produccion,'yyyy-MM-dd'),'#Factura' = facturas.numero_factura, 'Fecha Facturacion'= FORMAT(facturas.fecha,'yyyy-MM-dd'),'Fecha Estado Pago' = FORMAT(facturas.estado_pago,'yyyy-MM-dd')," +
      " 'Guia Despacho'= facturas.despachosguia_despacho, 'Fecha Despacho'= FORMAT(despachos.fecha,'yyyy-MM-dd') from facturas,despachos,procesos,trabajos,recepciones,ingresos,clientes\n" +
      "where facturas.despachosguia_despacho = despachos.guia_despacho and despachos.procesosid = procesos.id and  procesos.trabajosorden_trabajo = trabajos.orden_trabajo and\n" +
      "      trabajos.recepcionesid = recepciones.id and recepciones.ingresosid = ingresos.id and facturas.fecha between (?) and (?) ",[fechaInicio,fechaTermino])

  return this.facturasRepository.execute("select 'Serie' = ingresos.neumaticosserie, 'Orden Trabajo'= trabajos.orden_trabajo, 'Fecha Produccion'= FORMAT(trabajos.fecha_produccion,'yyyy-MM-dd'),'#Factura' = facturas.numero_factura, 'Fecha Facturacion'= FORMAT(facturas.fecha,'yyyy-MM-dd'),'Fecha Estado Pago' = FORMAT(facturas.estado_pago,'yyyy-MM-dd')," +
    " 'Guia Despacho'= facturas.despachosguia_despacho, 'Fecha Despacho'= FORMAT(despachos.fecha,'yyyy-MM-dd') from facturas,despachos,procesos,trabajos,recepciones,ingresos,clientes\n" +
    "where facturas.despachosguia_despacho = despachos.guia_despacho and despachos.procesosid = procesos.id and  procesos.trabajosorden_trabajo = trabajos.orden_trabajo and\n" +
    "      trabajos.recepcionesid = recepciones.id and recepciones.ingresosid = ingresos.id and facturas.fecha between (?) and (?) and clientes.id = (?)",[fechaInicio,fechaTermino,faena])

  }

}