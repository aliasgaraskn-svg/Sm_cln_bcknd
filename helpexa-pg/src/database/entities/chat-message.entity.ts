import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('chat_messages')
@ObjectType()
export class ChatMessage extends BaseEntity {
  @Column()
  @Field()
  role: string; // 'user' or 'ai'

  @Column({ type: 'text' })
  @Field()
  text: string;

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  toolsUsed: string[];

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
