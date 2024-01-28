import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tracking } from 'src/trackings/entities/tracking.entity';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(Tracking)
    private trackingRepository: Repository<Tracking>,
  ) {}
  async create(createScoreDto: CreateScoreDto) {
    const tracking = await this.trackingRepository.findOne({
      where: {
        id: createScoreDto.trackingId,
      },
    });

    const score = Score.create(tracking, createScoreDto);

    const result = await this.scoreRepository.save(score);

    return result;
  }
}
