import { IsNumber, IsString } from 'class-validator';

export class CreateScoreDto {
  @IsString()
  trackingId: string;
  @IsNumber()
  performanceScore: number;
  @IsNumber()
  accessibilityScore: number;
  @IsNumber()
  bestPracticesScore: number;
  @IsNumber()
  seoScore: number;
  @IsNumber()
  pwaScore: number;
}
