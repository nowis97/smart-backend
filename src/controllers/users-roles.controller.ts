import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {UsersRoles} from '../models';
import {UsersRolesRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class UsersRolesController {
  constructor(
    @repository(UsersRolesRepository)
    public usersRolesRepository : UsersRolesRepository,
  ) {}
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @post('/users-roles', {
    responses: {
      '200': {
        description: 'UsersRoles model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsersRoles)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsersRoles, {
            title: 'NewUsersRoles',
            
          }),
        },
      },
    })
    usersRoles: UsersRoles,
  ): Promise<UsersRoles> {
    return this.usersRolesRepository.create(usersRoles);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @get('/users-roles/count', {
    responses: {
      '200': {
        description: 'UsersRoles model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UsersRoles)) where?: Where<UsersRoles>,
  ): Promise<Count> {
    return this.usersRolesRepository.count(where);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @get('/users-roles', {
    responses: {
      '200': {
        description: 'Array of UsersRoles model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UsersRoles, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UsersRoles)) filter?: Filter<UsersRoles>,
  ): Promise<UsersRoles[]> {
    return this.usersRolesRepository.find(filter);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @patch('/users-roles', {
    responses: {
      '200': {
        description: 'UsersRoles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsersRoles, {partial: true}),
        },
      },
    })
    usersRoles: UsersRoles,
    @param.query.object('where', getWhereSchemaFor(UsersRoles)) where?: Where<UsersRoles>,
  ): Promise<Count> {
    return this.usersRolesRepository.updateAll(usersRoles, where);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @get('/users-roles/{id}', {
    responses: {
      '200': {
        description: 'UsersRoles model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UsersRoles, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(UsersRoles)) filter?: Filter<UsersRoles>
  ): Promise<UsersRoles> {
    return this.usersRolesRepository.findById(id, filter);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @patch('/users-roles/{id}', {
    responses: {
      '204': {
        description: 'UsersRoles PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsersRoles, {partial: true}),
        },
      },
    })
    usersRoles: UsersRoles,
  ): Promise<void> {
    await this.usersRolesRepository.updateById(id, usersRoles);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @put('/users-roles/{id}', {
    responses: {
      '204': {
        description: 'UsersRoles PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usersRoles: UsersRoles,
  ): Promise<void> {
    await this.usersRolesRepository.replaceById(id, usersRoles);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @del('/users-roles/{id}', {
    responses: {
      '204': {
        description: 'UsersRoles DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRolesRepository.deleteById(id);
  }
}
