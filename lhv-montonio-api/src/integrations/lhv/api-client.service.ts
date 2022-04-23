import { Injectable } from '@nestjs/common';
import https = require('https');
import fs = require('fs');
import crypto = require('crypto');

@Injectable()
export default class ApiClientService {
  config;

  constructor() {
    this.config = {
      hostname: process.env.LHV_API_HOSTNAME,
      port: 443,
      key: fs.readFileSync(`${process.env.PROJECT_DIR}/key.pem`),
      cert: fs.readFileSync(`${process.env.PROJECT_DIR}/cert.pem`),
    };
  }

  fetchAuthorizeToken(
    code: string,
    state: string,
  ): Promise<Record<string, string>> {
    const data = new URLSearchParams({
      client_id: process.env.LHV_API_CLIENT_ID,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.APP_URL}/oath-callback`,
      code,
      state,
    });

    const options = {
      path: '/psd2/oauth/token',
      method: 'POST',
      agent: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...this.config,
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          resolve(JSON.parse(chunk));
        });
      });
      req.write(data.toString());
      req.end();
    });
  }

  fetchAccountList(accessToken: string): Promise<Record<string, any>> {
    const options = {
      path: '/psd2/v1/accounts-list',
      method: 'GET',
      agent: false,
      headers: {
        'Content-Type': 'application/hal+json',
        'X-Request-ID': crypto.randomBytes(16).toString('hex'),
        Authorization: `Bearer ${accessToken}`,
      },
      ...this.config,
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          resolve(JSON.parse(chunk));
        });
      });
      req.end();
    });
  }
}
