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
import { AuthUser } from 'src/users/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('trackings')
export class TrackingsController {
  constructor(private readonly trackingsService: TrackingsService) {}

  @Post()
  create(@Body() createTrackingDto: CreateTrackingDto, @AuthUser() user: User) {
    const input = {
      user: user.id,
      url: createTrackingDto.url,
    };

    return this.trackingsService.create(input);
  }

  @Get()
  findAll() {
    return this.trackingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackingDto: UpdateTrackingDto,
  ) {
    return this.trackingsService.update(+id, updateTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingsService.remove(+id);
  }
}
