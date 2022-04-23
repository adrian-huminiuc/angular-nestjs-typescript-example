import { Injectable } from '@nestjs/common';
import ApiClientService from '../integrations/lhv/api-client.service';

@Injectable()
export default class OathService {
  public constructor(private readonly lhvHttpClient: ApiClientService) {}

  async authorize(
    code: string,
    state: string,
  ): Promise<Record<string, string>> {
    return await this.lhvHttpClient.fetchAuthorizeToken(code, state);
  }
}
