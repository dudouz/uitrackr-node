import { Tracking } from 'src/trackings/entities/tracking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateScoreDto } from '../dto/create-score.dto';

@Entity()
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => Tracking, (tracking) => tracking.id, { cascade: true })
  @JoinColumn({ name: 'trackingId' })
  tracking: Tracking;

  @Column('decimal', { precision: 6, scale: 2 })
  pwa: number;

  @Column('decimal', { precision: 6, scale: 2 })
  performance: number;

  @Column('decimal', { precision: 6, scale: 2 })
  accessibility: number;

  @Column('decimal', { precision: 6, scale: 2 })
  bestpractices: number;

  @Column('decimal', { precision: 6, scale: 2 })
  seo: number;

  static create(tracking: Tracking, scores: CreateScoreDto) {
    const score = new Score();

    score.tracking = tracking;
    score.pwa = scores.pwaScore;
    score.performance = scores.performanceScore;
    score.accessibility = scores.accessibilityScore;
    score.bestpractices = scores.bestPracticesScore;
    score.seo = scores.seoScore;

    return score;
  }
}
