import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
} from '@nestjs/common';
import ApiClientService from '../integrations/lhv/api-client.service';
import { UsersService } from '../user/user.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly lhvHttpClient: ApiClientService,
    private readonly userService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Get(':id/list')
  async getAccountList(@Param('id') id: string) {
    const user = await this.userService.findOne({ id });

    const response = await this.lhvHttpClient.fetchAccountList(
      user.lhvOathToken,
    );

    if (!response?.accounts) {
      this.logger.error(response);
      throw new BadRequestException(
        'Could not fetch account list. Check logs!',
      );
    }

    return response;
  }
}
