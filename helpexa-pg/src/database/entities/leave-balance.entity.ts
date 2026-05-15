import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('leave_balances')
export class LeaveBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 8 })
  casual: number;

  @Column({ default: 6 })
  sick: number;

  @Column({ default: 4 })
  earned: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
