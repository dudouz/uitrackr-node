import { Score } from 'src/scores/entities/score.entity';
import { Site } from 'src/sites/entities/site.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ERROR = 'error',
}

interface CreateTrackingCommand {
  user: User;
  site: Site;
}

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Site)
  site: Site;

  @OneToOne(() => Score)
  score: Score;

  @Column()
  status: Status = Status.PENDING;

  @CreateDateColumn()
  created_at: Date;

  static create(input: CreateTrackingCommand) {
    const tracking = new Tracking();

    tracking.user = input.user;
    tracking.site = input.site;

    return tracking;
  }
}
