import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Site } from 'src/sites/entities/site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Site])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
