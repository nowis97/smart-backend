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
import {Users} from '../models';
import {RolesRepository, UsersRepository, UsersRolesRepository} from '../repositories';
import * as bcrypt from 'bcrypt';
import {promisify} from 'util';
import {sign} from 'jsonwebtoken';
import {JWT_SECRET, secured, SecuredType} from '../auth';

import {HttpErrors} from '@loopback/rest/dist';

const signAsync = promisify(sign);

interface Credentials {
  username: string;
  password: string;
}

export class UsersController {
  private SALT_ROUNDS = 8;
  constructor(
    @repository(UsersRepository)
    public usersRepository : UsersRepository,
    @repository(UsersRolesRepository) private usersRolesRepository : UsersRolesRepository,
    @repository(RolesRepository) private rolesRepository:RolesRepository

  ) {}
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @post('/users', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',

          }),
        },
      },
    })
    users: Users,
  ): Promise<Users> {
    const hashPassword = async ()=>{
      return bcrypt.hash(users.password, this.SALT_ROUNDS);
    };

    users.password = await hashPassword();

    return this.usersRepository.create(users);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @get('/users/count', {
    responses: {
      '200': {
        description: 'Users model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.count(where);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Users, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @patch('/users', {
    responses: {
      '200': {
        description: 'Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    users.password = await bcrypt.hash(users.password,this.SALT_ROUNDS);

    await this.usersRepository.updateById(id, users);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }
  @secured(SecuredType.HAS_ROLES,['superuser'])
  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
  @secured(SecuredType.PERMIT_ALL)
  @post('/users/login')
  async login(@requestBody() credentials: Credentials) {
    if (!credentials.username || !credentials.password)
      throw new HttpErrors.BadRequest('Missing Username or Password');

    const user = await this.usersRepository.findOne({where: {nombre: credentials.username}});

    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');

    const isPasswordMatched = await bcrypt.compare(credentials.password,user.password.toString());
    //const isPasswordMatched = user.password === credentials.password;
    if (!isPasswordMatched) throw new HttpErrors.Unauthorized('Credenciales Invalidas');

    const tokenObject = {username: credentials.username};
    const token = await signAsync(tokenObject, JWT_SECRET);
    const roles = await this.usersRolesRepository
      .execute('select \'nombre\'= roles.nombre from users,users_roles,roles where users_roles.rolesid = roles.id and users_roles.usersid = users.id and users.id =(?)',[user.id]);


    return {
      token,
      id: user.nombre,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      roles: roles.map((r: { nombre: any; }) => r.nombre),
    };
  }
}

