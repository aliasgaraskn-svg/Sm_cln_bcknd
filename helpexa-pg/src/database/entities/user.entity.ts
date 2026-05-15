import { Entity, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ select: false }) // Don't return password in queries
  password: string;

  @Column({ default: 'Employee' })
  @Field()
  role: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;
}
