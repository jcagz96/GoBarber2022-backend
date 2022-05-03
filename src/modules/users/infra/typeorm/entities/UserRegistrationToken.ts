import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  Unique,
} from 'typeorm';

@Entity('user_push-notifications')
class UserRegistrationToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  registrationToken: string;

  @Column()
  enabled: boolean;

  @Column()
  user_id: string;

  @Column({ unique: true })
  device_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserRegistrationToken;
