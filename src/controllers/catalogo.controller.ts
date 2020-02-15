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
import {Catalogo} from '../models';
import {CatalogoRepository} from '../repositories';

export class CatalogoController {
  constructor(
    @repository(CatalogoRepository)
    public catalogoRepository : CatalogoRepository,
  ) {}

  @post('/catalogo', {
    responses: {
      '200': {
        description: 'Catalogo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Catalogo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catalogo, {
            title: 'NewCatalogo',
            
          }),
        },
      },
    })
    catalogo: Catalogo,
  ): Promise<Catalogo> {
    return this.catalogoRepository.create(catalogo);
  }

  @get('/catalogo/count', {
    responses: {
      '200': {
        description: 'Catalogo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Catalogo)) where?: Where<Catalogo>,
  ): Promise<Count> {
    return this.catalogoRepository.count(where);
  }

  @get('/catalogo', {
    responses: {
      '200': {
        description: 'Array of Catalogo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Catalogo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Catalogo)) filter?: Filter<Catalogo>,
  ): Promise<Catalogo[]> {
    return this.catalogoRepository.find(filter);
  }

  @patch('/catalogo', {
    responses: {
      '200': {
        description: 'Catalogo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catalogo, {partial: true}),
        },
      },
    })
    catalogo: Catalogo,
    @param.query.object('where', getWhereSchemaFor(Catalogo)) where?: Where<Catalogo>,
  ): Promise<Count> {
    return this.catalogoRepository.updateAll(catalogo, where);
  }

  @get('/catalogo/{id}', {
    responses: {
      '200': {
        description: 'Catalogo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Catalogo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Catalogo)) filter?: Filter<Catalogo>
  ): Promise<Catalogo> {
    return this.catalogoRepository.findById(id, filter);
  }

  @patch('/catalogo/{id}', {
    responses: {
      '204': {
        description: 'Catalogo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catalogo, {partial: true}),
        },
      },
    })
    catalogo: Catalogo,
  ): Promise<void> {
    await this.catalogoRepository.updateById(id, catalogo);
  }

  @put('/catalogo/{id}', {
    responses: {
      '204': {
        description: 'Catalogo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() catalogo: Catalogo,
  ): Promise<void> {
    await this.catalogoRepository.replaceById(id, catalogo);
  }

  @del('/catalogo/{id}', {
    responses: {
      '204': {
        description: 'Catalogo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.catalogoRepository.deleteById(id);
  }

  @get('/catalogo/marcas',{
    responses:{
      200:{
        description:'array of distinct marcas'
      }
    }
  })
  async getMarcas():Promise<object>{
    return this.catalogoRepository
      .execute('select distinct manufacturer from catalogo',[]);
  }

  @get('/catalogo/medida/{marca}',{
    responses:{
      200:{
        description:'array of medidas according a marca'
      }
    }
})
  async getMedida(@param.path.string('marca') marca: string):Promise<object>{
    return this.catalogoRepository.execute("select distinct size from catalogo where manufacturer = (?)",[marca]);
    // return this.catalogoRepository.find({
    //   fields:
    //     {size:true},
    //   where:
    //     {
    //       manufacturer: marca
    //     }
    // })

  }

@get('/catalogo/modelo/{marca}/{medida}',{
  responses:{
    200:{
      description:'array of modelo according marca and medida'
    }
  }
})
  async getModelo(@param.path.string('marca') marca: string,
                  @param.path.string('medida') medida:string){

  return this.catalogoRepository.execute("select distinct 'patternTreadDesign'= pattern_tread_design from catalogo where manufacturer = (?) and size = (?)",[marca,medida]);


  // return this.catalogoRepository.find({
  //     fields:{
  //       patternTreadDesign:true,
  //     },
  //     where:{
  //       and:[{manufacturer:marca},{size:medida}]
  //     }
  //   })
}

@get('/catalogo/numero-catalogo/{marca}/{medida}/{modelo}/{compuesto}',{
  responses:{
    200:{
      description:'value of numero catalogo accordin marca, medida and modelo'
    }
  }
})async getNumeroCatalogo(@param.path.string('marca') marca: string,
                          @param.path.string('medida') medida:string,
                           @param.path.string('modelo') modelo:string,
                          @param.query.string('compuesto') compuesto:string
                          ){

  return this.catalogoRepository.find({
    fields:{
      catalogueNumber:true,
    },
    where:{
      and:[{manufacturer:marca},{size:medida},{patternTreadDesign:modelo},compuesto?{compound:compuesto}:{}]
    }
  })
}
@get('/catalogo/compuesto/{marca}/{medida}/{modelo}',{
  responses:{
    200:{
      description:'array of compuestos according marca, medida and modelo'
    }
  }
})async getCompuesto(@param.path.string('marca') marca: string,
                     @param.path.string('medida') medida:string,
                     @param.path.string('modelo') modelo:string){

  return this.catalogoRepository.find({
    fields:{
      compound:true,
    },
    where:{
      and:[{manufacturer:marca},{size:medida},{patternTreadDesign:modelo}]
    }
  })


}
}
