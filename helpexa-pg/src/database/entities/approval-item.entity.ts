import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('approval_items')
@ObjectType()
export class ApprovalItem extends BaseEntity {
  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  requestor: string;

  @Column({ default: 'Pending' })
  @Field()
  status: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;
}
