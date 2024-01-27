import { IsString } from 'class-validator';

export class CreateTrackingDto {
  @IsString()
  url: string;
}

export class CreateTrackingInput {
  @IsString()
  user: string;
  @IsString()
  url: string;
}
