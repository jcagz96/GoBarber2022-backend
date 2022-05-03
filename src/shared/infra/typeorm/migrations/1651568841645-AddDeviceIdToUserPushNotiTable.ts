import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeviceIdToUserPushNotiTable1651568841645 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_push-notifications',
      new TableColumn({
        name: 'device_id',
        type: 'text',
        isUnique: true,
        isNullable: false
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_push-notifications', 'device_id');
  }

}
