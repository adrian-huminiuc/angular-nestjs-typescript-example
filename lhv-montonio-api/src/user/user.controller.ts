import { Controller, Get } from '@nestjs/common';
import ApiClientService from '../integrations/lhv/api-client.service';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly lhvHttpClient: ApiClientService,
    private readonly userService: UsersService,
  ) {}

  @Get('test-user')
  async getTestUser() {
    const user = await this.userService.findOne({ userName: 'max.musterman' });

    return {
      id: user.id,
      lhvIsEnabled: user.lhvOathToken.length > 0,
    };
  }
}
