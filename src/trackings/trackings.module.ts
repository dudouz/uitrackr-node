import { Module } from '@nestjs/common';
import { TrackingsService } from './trackings.service';
import { TrackingsController } from './trackings.controller';
import { Tracking } from './entities/tracking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from 'src/scores/entities/score.entity';
import { Site } from 'src/sites/entities/site.entity';
import { User } from 'src/users/entities/user.entity';
import { SitesService } from 'src/sites/sites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tracking, Site, Score, User])],
  controllers: [TrackingsController],
  providers: [TrackingsService, SitesService],
})
export class TrackingsModule {}
