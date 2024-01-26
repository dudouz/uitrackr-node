import { Tracking } from 'src/trackings/entities/tracking.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => Tracking)
  tracking: Tracking;

  @Column()
  pwa: number;

  @Column()
  performance: number;

  @Column()
  accessibility: number;

  @Column()
  best_practices: number;

  @Column()
  seo: number;
}
