import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('itsm_tickets')
@ObjectType()
export class ItsmTicket extends BaseEntity {
  @Column()
  @Field()
  category: string;

  @Column()
  @Field()
  priority: string;

  @Column()
  @Field()
  subject: string;

  @Column()
  @Field()
  description: string;

  @Column({ default: 'Open' })
  @Field()
  status: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  assignedTo: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  openDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  closeDate: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;
}
