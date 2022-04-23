import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { User } from '../../src/user/user.entity';

const loadUsers = async (manager: EntityManager) => {
  const user = new User();
  user.firstName = `Max`;
  user.lastName = `Musterman`;
  user.userName = `max.musterman`;
  await manager.save(user);
};

export default loadUsers;
