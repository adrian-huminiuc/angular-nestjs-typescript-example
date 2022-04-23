import {
  Res,
  Body,
  Controller,
  Logger,
  Post,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../user/user.service';
import OathService from './oath.service';

@Controller('oath')
export class OathController {
  constructor(
    private readonly userService: UsersService,
    private readonly oathService: OathService,
    private readonly logger: Logger,
  ) {}

  @Post('authorize')
  async authorize(
    @Body() body: { code: string; state: string },
    @Res() response: Response,
  ) {
    let authToken = '';
    let id: number | null = null;

    const user = await this.userService.findOne({
      userName: body.state,
    });

    if (!user) {
      throw new BadRequestException('Could not find the specific user');
    }

    try {
      const authResponse = await this.oathService.authorize(
        body.code,
        body.state,
      );

      authToken = user.lhvOathToken = authResponse?.access_token ?? '';
      id = user.id;
      await this.userService.save(user);
    } catch (exception) {
      this.logger.error(exception.toString());
    }

    return response
      .status(authToken.length === 0 ? HttpStatus.BAD_REQUEST : HttpStatus.OK)
      .send(JSON.stringify({ id, authorized: authToken.length > 0 }));
  }
}
