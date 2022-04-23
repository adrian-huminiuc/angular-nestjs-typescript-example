import { createConnection } from 'typeorm';
import ormConfig = require('../../ormconfig');
import loadUsers from './users.fixtures';

require('reflect-metadata');
require('ts-node/register');

export async function load() {
  console.log('Running fixtures!');
  const connection = await createConnection(ormConfig);

  console.log('Loading users');
  await loadUsers(connection.manager);
}

load().then(() => process.exit(0));
