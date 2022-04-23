import {MigrationInterface, QueryRunner} from "typeorm";

export class setup1650728103730 implements MigrationInterface {
    name = 'setup1650728103730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`userName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`lhvOathToken\` varchar(255) NOT NULL DEFAULT '', UNIQUE INDEX \`IDX_da5934070b5f2726ebfd3122c8\` (\`userName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_da5934070b5f2726ebfd3122c8\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
