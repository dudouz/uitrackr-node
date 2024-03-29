import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrackingsService } from './trackings.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { AuthUser, UserToken } from 'src/users/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('trackings')
export class TrackingsController {
  constructor(private readonly trackingsService: TrackingsService) {}

  @Post()
  create(
    @Body() createTrackingDto: CreateTrackingDto,
    @AuthUser() user: User,
    @UserToken() token: string,
  ) {
    const input = {
      user: user.id,
      url: createTrackingDto.url,
    };

    return this.trackingsService.create(input, token);
  }

  @Get()
  findAll() {
    return this.trackingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingsService.update(updateTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingsService.remove(+id);
  }
}
