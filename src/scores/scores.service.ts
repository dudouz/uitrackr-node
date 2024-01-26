import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoresService {
  create(createScoreDto: CreateScoreDto) {
    return 'This action adds a new score';
  }

  findAll() {
    return `This action returns all scores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
