import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn({ name: 'create_datetime' })
  @Field()
  create_datetime: Date;

  @UpdateDateColumn({ name: 'update_datetime' })
  @Field()
  update_datetime: Date;
}
