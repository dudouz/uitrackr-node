import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingsModule } from './trackings/trackings.module';
import { UsersModule } from './users/users.module';
import { SitesModule } from './sites/sites.module';
import { ScoresModule } from './scores/scores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './sites/entities/site.entity';
import { Tracking } from './trackings/entities/tracking.entity';
import { Score } from './scores/entities/score.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TrackingsModule,
    UsersModule,
    SitesModule,
    ScoresModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'uitrackr',
      logging: true,
      synchronize: true,
      entities: [User, Site, Tracking, Score],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
