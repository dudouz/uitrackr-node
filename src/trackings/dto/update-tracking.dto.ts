import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackingDto } from './create-tracking.dto';
import { IsObject, IsString } from 'class-validator';

export class UpdateTrackingDto extends PartialType(CreateTrackingDto) {
  @IsString()
  id: string;

  @IsObject()
  scores: {
    performanceScore: number;
    accessibilityScore: number;
    bestPracticesScore: number;
    seoScore: number;
    pwaScore: number;
  };
}
