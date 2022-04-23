module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/**/*entity.ts'],
  migrations: ['ORM/migration/**/*migration.ts'],
  subscribers: ['dist/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'dist/**/*entity.ts',
    migrationsDir: 'ORM/migration',
    subscribersDir: 'dist/subscriber',
  },
};
