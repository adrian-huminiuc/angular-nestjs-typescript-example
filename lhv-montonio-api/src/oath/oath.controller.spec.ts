import { Test, TestingModule } from '@nestjs/testing';
import { OathController } from './oath.controller';
import { Logger } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import ApiClientService from '../integrations/lhv/api-client.service';
import OathService from './oath.service';
import { UsersModule } from '../user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from '../user/user.entity';

describe('OathController', () => {
  let controller: OathController;
  let user: User;
  let userService: UsersService;
  let module: TestingModule;

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [OathController],
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.MYSQL_HOST,
          port: parseInt(process.env.MYSQL_PORT, 10),
          username: 'root',
          password: process.env.MYSQL_PASSWORD,
          database: `${process.env.MYSQL_DATABASE}_test`,
          autoLoadEntities: true,
          synchronize: true,
        }),
        UsersModule,
      ],
      providers: [
        Logger,
        UsersService,
        ApiClientService,
        {
          provide: OathService,
          useValue: {
            authorize: jest
              .fn()
              .mockReturnValue(Promise.resolve({ access_token: 'test_token' })),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    user = new User();
    user.userName = 'tst.username' + Math.random() * 1000;
    user.firstName = 'first';
    user.lastName = 'last';
    await userService.save(user);

    controller = module.get<OathController>(OathController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();

    const res = {
      status: jest.fn().mockReturnValue({
        send: (body) => {
          return Promise.resolve(body);
        },
      }),
    } as unknown as Response;

    const response = (await controller.authorize(
      {
        code: 'test_code',
        state: user.userName,
      },
      res,
    )) as unknown as string;

    expect(JSON.parse(response)?.authorized).toBe(true);

    const savedUser = await userService.findOne({ userName: user.userName });
    expect(savedUser.lhvOathToken).toBe('test_token');
  });
});
