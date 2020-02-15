// Uncomment these imports to begin using these cool features!




import { post, requestBody} from '@loopback/rest';
import xlsx from 'xlsx';
import {unlinkSync} from 'fs';
import {repository} from '@loopback/repository';
import {MapleRepository} from '../repositories';
import {Maple} from '../models';
import {HttpErrors} from '@loopback/rest/dist';
import {secured, SecuredType} from '../auth';
export class UploadImagesController {
    constructor(
      @repository(MapleRepository) private mapleRepository: MapleRepository
    ) {
  }
  @secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
  @post('/upload-image', {
  responses: {
    200: {
      content: {
        'application/json': {
        },
      },
      description: '',
    },
  },
})
async uploadImage(
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data':{
            schema: {type: 'object'}
        }
      },
    })
        body:unknown
) {
      return body;
}

@secured(SecuredType.HAS_ANY_ROLE,['superuser','ingreso'])
@post('/import-excel', {
  responses: {
    200: {
      content: {
        'application/json': {
        },
      },
      description: 'Mensaje del estado del excel importado',
    },
  },
})async importExcel(
  @requestBody({
    description: 'Datos en formato json',
    required: true,
    content: {
      'multipart/form-data':{
        schema: {type: 'object'}
      }
    },
  })
    body:Object
){

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
  const excel = xlsx.readFile('uploads/'+body.filename,{type:'file'});
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  unlinkSync('uploads/'+body.filename);
  const ws =  excel.Sheets[excel.SheetNames[0]];
  const result = xlsx.utils.sheet_to_json(ws);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const headers = Object.keys(result[0]);

  const columnasAConfirmar = ['serie','factura','ahorro emision co2','litros petroleo',
                            'ahorro emisiones co2','codigo producto','nombre producto'];


  if (headers.length !== 7)
    throw new HttpErrors.NotAcceptable('El archivo tiene mas columnas de lo normal');

  for (let i = 0;i<columnasAConfirmar.length;i++){
    if (!headers[i].toLowerCase().includes(columnasAConfirmar[i]))
      throw new HttpErrors.NotAcceptable('No se encuentra la columna '+ columnasAConfirmar[i] +'en orden o no existe');
  }



  if (!headers[1].toLowerCase().includes('factura'))
    throw new HttpErrors.NotAcceptable('No se encuentra la columna factura en orden o no existe');




  for (const value of result) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await this.mapleRepository.create(new Maple({
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        serie:value[headers[0]],
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        numeroFactura:value[headers[1]],
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ahorroEmisionesCo2:value[headers[4]],
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ahorroCo2:value[headers[2]],
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ahorroDiesel:value[headers[3]],
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        codProducto: value[headers[5]],
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        nombreProducto:value[headers[6]]

      }))
    }catch (e) {
      console.log(e);
    }
  }

  return {message:'Archivo importado correctamente'};
}
}