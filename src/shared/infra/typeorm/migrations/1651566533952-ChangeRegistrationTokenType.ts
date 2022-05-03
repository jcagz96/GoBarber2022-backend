import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeRegistrationTokenType1651566533952 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_push-notifications', 'registrationToken');
    await queryRunner.addColumn(
      'user_push-notifications',
      new TableColumn({
        name: 'registrationToken',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_push-notifications', 'registrationToken');
    await queryRunner.addColumn(
      'user_push-notifications',
      new TableColumn({
        name: 'registrationToken',
        type: 'uuid',
      }),
    );
  }

}
