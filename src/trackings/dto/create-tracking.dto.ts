import { IsNumber, IsString } from 'class-validator';

export class CreateTrackingDto {
  @IsString()
  site_url: string;
  @IsNumber()
  user: string;
}
