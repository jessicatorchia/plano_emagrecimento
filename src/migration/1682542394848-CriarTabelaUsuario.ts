import { MigrationInterface, QueryRunner } from "typeorm"

export class CriarTabelaUsuario1682542394848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE p_usuario(
                id serial not null, 
                nome varchar not null,
                idade int not null,
                altura numeric(10,2) not null,
                peso numeric(10,2) not null,
                objetivo varchar not null,
                primary key (id)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE p_usuario`)
    }

}