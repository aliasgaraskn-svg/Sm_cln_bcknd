import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('hr_requests')
@ObjectType()
export class HrRequest extends BaseEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;
}
