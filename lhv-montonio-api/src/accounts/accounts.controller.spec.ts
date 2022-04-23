import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { UsersModule } from '../user/users.module';
import { Logger } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import ApiClientService from '../integrations/lhv/api-client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

describe('AccountsController', () => {
  let controller: AccountsController;
  let user: User;
  let module: TestingModule;

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AccountsController],
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
        {
          provide: ApiClientService,
          useValue: {
            fetchAccountList: jest
              .fn()
              .mockReturnValue(
                Promise.resolve({ accounts: [{ iban: 'test' }] }),
              ),
          },
        },
      ],
    }).compile();

    const userService = module.get<UsersService>(UsersService);
    user = new User();
    user.userName = 'tst.username' + Math.random() * 1000;
    user.firstName = 'first';
    user.lastName = 'last';
    await userService.save(user);

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();

    const response = await controller.getAccountList(user.id.toString(10));
    expect(response?.accounts.length).toBe(1);
  });
});
