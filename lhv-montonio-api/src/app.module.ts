import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OathController } from './oath/oath.controller';
import { UsersService } from './user/user.service';
import OathService from './oath/oath.service';
import { UsersModule } from './user/users.module';
import { AccountsController } from './accounts/accounts.controller';
import ApiClientService from './integrations/lhv/api-client.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [OathController, AccountsController],
  providers: [Logger, UsersService, ApiClientService, OathService],
})
export class AppModule {}
