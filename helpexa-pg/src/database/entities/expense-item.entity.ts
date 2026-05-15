import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('expense_items')
@ObjectType()
export class ExpenseItem extends BaseEntity {
  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  amount: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;
}
