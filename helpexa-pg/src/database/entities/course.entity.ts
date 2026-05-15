import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('courses')
@ObjectType()
export class Course extends BaseEntity {
  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status: string;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;
}
