import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import ApiClientService from '../integrations/lhv/api-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, ApiClientService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
