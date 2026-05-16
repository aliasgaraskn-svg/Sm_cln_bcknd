import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn({ name: 'create_datetime', type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
  @Field()
  create_datetime: Date;

  @UpdateDateColumn({ name: 'update_datetime', type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  @Field()
  update_datetime: Date;
}
