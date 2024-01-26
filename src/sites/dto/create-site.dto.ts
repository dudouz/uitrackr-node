import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateSiteDto {
  @IsString()
  url: string;
  @IsNumber()
  user: User;
}
