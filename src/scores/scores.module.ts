import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Tracking } from 'src/trackings/entities/tracking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Tracking])],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
